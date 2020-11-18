const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {  
  if (!request.body.title || !request.body.author) {
    response.status(400).json({
      error: 'title or author missing'
    })
  }

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  const result = await new Blog(blog).save()
  response.status(201).json(result)
})

module.exports = blogsRouter
  