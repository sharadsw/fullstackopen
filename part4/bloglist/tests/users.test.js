const bcrypt = require('bcrypt')
const User = require('../models/user')

const helper = require('./tests_helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('henlo', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('check for GET all users request', async () => {
    const initialUsers = await helper.usersInDb()

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('adding a user', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'sharad',
      name: 'Sharad S',
      password: 'passpass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await helper.usersInDb()

    expect(finalUsers).toHaveLength(initialUsers.length + 1)
    expect(finalUsers.map(u => u.username)).toContain(newUser.username)
  })
})