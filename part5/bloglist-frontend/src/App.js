import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const BlogList = ({ username, blogs }) => {
  return (
    <div>
      <h1>welcome, {username}</h1>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    loginService.login({ username, password, })
      .then(loggedUser => {
        console.log(loggedUser);
        setUser(loggedUser)
        setUsername('')
        setPassword('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {user === null ? <LoginForm handleLogin={handleLogin}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        username={username}
        password={password} />
        : <BlogList username={user.username} blogs={blogs} />}
    </div>
  )
}

export default App