import React, { useState, useRef } from 'react'

import Togglable from './Togglable'

import { Link } from "react-router-dom"

const BlogForm = ({ handleBlogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormToggle = useRef()

  const handleCreate = async (event) => {
    event.preventDefault()
    handleBlogs({ title, author, url })
    setTitle('')
    setUrl('')
    setAuthor('')
    blogFormToggle.current.toggleVisibility()
  }

  return (
    <Togglable showLabel='add blog' hideLabel='cancel' ref={blogFormToggle}>
      <form onSubmit={handleCreate}>
        <div>
          title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} id="title" />
        </div>
        <div>
          author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} id="author" />
        </div>
        <div>
          url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} id="url" />
        </div>
        <button type="submit" id="createBlog">create</button>
      </form>
    </Togglable>
  )
}

const BlogList = ({ blogs, handleBlogs }) => {

  return (
    <div>
      <h2>create new blog</h2>

      <BlogForm
        handleBlogs={handleBlogs}
      />

      <h2>blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <h2 className="blog"><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></h2>
      )}
    </div>
  )
}

export default BlogList