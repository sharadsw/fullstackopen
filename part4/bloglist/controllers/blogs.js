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

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.likes) {
    response.status(400).json({
      error: 'likes missing'
    })
  }

  const updateBlog = {
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true, runValidators: true })
  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
  