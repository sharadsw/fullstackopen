const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

// removed in 4.20:
// const getTokenFrom = request => {
//   const auth = request.get('authorization')
//   if (auth && auth.toLowerCase().startsWith('bearer ')) {
//     return auth.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {  
  if (!request.body.title || !request.body.author) {
    response.status(400).json({
      error: 'title or author missing'
    })
  }

  // removed in 4.20
  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  // const blogUser = await User.findOne({})
  const blogUser = await User.findById(decodedToken.id)

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: blogUser._id
  }

  const result = await new Blog(blog).save()
  blogUser.blogs = blogUser.blogs.concat(result._id)
  await blogUser.save({ validateModifiedOnly: true })

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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({
      error: 'invalid blog'
    })
  }

  if (decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({
      error: 'not authorized to delete this blog'
    })
  }

  await Blog.findByIdAndDelete(blog._id)
  response.status(204).end()
})

blogsRouter.post("/:id/comments", async (req, res) => {
  const comment = req.body.comment
  if (comment.trim() === "") {
    res.status(401).json({
      error: "empty comment"
    })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(404).end()
  }

  const commentsToSave = {
    comments: [...blog.comments, { comment }]
  }
  const result = await Blog.findByIdAndUpdate(req.params.id, commentsToSave, { new: true })
  if (result) {
    res.json(result)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
  