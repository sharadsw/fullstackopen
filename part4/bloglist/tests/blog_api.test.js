const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const validId = '5a422a851b54a676234d17f7'
const invalidId = '5a422a851b54a676234d17f8'

beforeAll(async () => {
  await User.deleteMany({})
  const user = new User({
    username: 'root',
    name: 'root',
    password: 'pass'
  })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'pass' })
  console.log('LOOK LOOK LOOK LOOK LOOK LOOK LOOK', response.body)

  // this isn't working
  // i'll probably try to skip
})


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('check id property exists', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

describe('GET requests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
  })

  test('a specific blog exists in all returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'Type wars'
    )
  })
})

describe('POST requests', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'Attack the day',
      author: 'Mayonaise michael',
      url: 'www.google.com',
      likes: 45
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)
    expect(response.body.map(r => r.title)).toContain('Attack the day')
  })

  test('likes is defaulted to 0 if not provided', async () => {
    const newBlog = {
      title: 'Attack the day',
      author: 'Mayonaise michael',
      url: 'www.google.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === 'Attack the day')
    expect(addedBlog.likes).toEqual(0)
  })

  test('if title or author not provided return 400', async () => {
    const newBlog = {
      url: 'www.google.com',
      likes: 70
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })
})

describe('DELETE requests', () => {
  test('valid id', async () => {
    await api
      .delete(`/api/blogs/${validId}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length - 1)
  })

  test('invalid id', async () => {
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(204)
  })
})

describe('PUT requests', () => {
  const update = {
    likes: 10
  }

  test('valid id', async () => {
    await api
      .put(`/api/blogs/${validId}`)
      .send(update)
      .expect(200)
  })

  test('likes missing in body', async () => {
    await api
      .put(`/api/blogs/${validId}`)
      .expect(400)
  })

  test('invalid id', async () => {
    await api
      .put(`/api/blogs/${invalidId}`)
      .send(update)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})