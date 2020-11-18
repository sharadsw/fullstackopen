const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const max = Math.max(...blogs.map(blog => blog.likes))
  const result = blogs.find(blog => blog.likes === max)

  return { title: result.title, author: result.author, likes: result.likes }
}

const mostBlogs = (blogs) => {
  const res = lodash.groupBy(blogs, 'author')

  console.log(lodash.countBy(res, 'author'))
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs
}