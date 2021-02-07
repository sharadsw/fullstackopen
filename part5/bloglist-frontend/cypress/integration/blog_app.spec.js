describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "test",
      username: "testUser",
      password: "testadmin"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Login to the app")
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("input:first").type("testUser")
      cy.get("input:last").type("testadmin")
      cy.contains("login").click()
      cy.contains("welcome, test")
    })

    it('fails with wrong credentials', function () {
      cy.get("input:first").type("testUser")
      cy.get("input:last").type("wrongPass")
      cy.contains("login").click()
      cy.contains("Wrong username or password")
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'testadmin' })
    })

    it('A blog can be created', function () {
      cy.contains("create new blog")
      cy.contains("add blog").click()
      cy.get("#title").type("test")
      cy.get("#author").type("test")
      cy.get("#url").type("test")
      cy.get("#createBlog").click()
      cy.contains("New blog added: test - by test")
    })

    describe('blog functions', function () {
      beforeEach(function () {
        cy.contains("add blog").click()
        cy.get("#title").type("test")
        cy.get("#author").type("test")
        cy.get("#url").type("test")
        cy.get("#createBlog").click()
      })

      it('A blog can be liked', function () {
        cy.contains("likes: 0")
        cy.get("#likeButton").click()
        cy.contains("likes: 1")
      })

      it('A blog can be deleted', function () {
        cy.contains("delete")
        cy.contains("delete").click()
      })
    })

    it('Blogs are sorted', function () {
      cy.request("POST", "http://localhost:3003/api/testing/dummyBlogs")

      let likeArr = []
      cy.get(".likeCount").each((elem) => likeArr.push( parseInt(elem.text()) ) )
        .then(() => {
          cy.log("Like Array", likeArr.toString())

          let sortedLikeArr = [...likeArr].sort((a, b) => b-a)
          cy.log("Sorted likes", sortedLikeArr.toString())
          expect(sortedLikeArr.toString()).to.equal(likeArr.toString())
        })
    })
  })
})