import React, { useState, useRef } from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, updateBlogs, username, deleteBlog }) => {

  const handleLikes = () => {
    updateBlogs({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: ++blog.likes
    }, blog.id)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className="blog">
      <span>
        {blog.title}
      </span><br />
      <span>
        {blog.author}
      </span><br />
      <span>
        {blog.url}
      </span><br />
      <span>
        likes: <span className="likeCount">{blog.likes}</span>
      </span>
      <button onClick={handleLikes} id="likeButton">
        like
      </button>
      <br />
      {blog.user && username === blog.user.username &&
        <button onClick={handleDelete}>
          delete
        </button>
      }
    </div>
  )
}

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

const BlogList = ({ username, blogs, handleLogout, handleBlogs, updateBlogs, deleteBlog }) => {

  return (
    <div>
      <h1>welcome, {username}</h1>
      <button onClick={handleLogout}>logout</button>
      <h2>create new blog</h2>

      <BlogForm
        handleBlogs={handleBlogs}
      />

      <h2>blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} username={username} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default BlogList
