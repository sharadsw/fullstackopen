import React, { useState, useRef } from 'react'

import Togglable from './Togglable'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

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
          title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

const BlogList = ({ username, blogs, handleLogout, handleBlogs }) => {

  return (
    <div>
      <h1>welcome, {username}</h1>
      <button onClick={handleLogout}>logout</button>
      <h2>create new blog</h2>

      <BlogForm
        handleBlogs={handleBlogs}
      />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList
