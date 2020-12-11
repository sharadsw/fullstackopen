import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

// struggling with the event handlers
// const BlogForm = ({ title, handleTitle, author, handleAuthor, url, handleUrl }) => {
//   return (
//     <form>
//       <div>
//         title: <input value={title} onChange={({ target }) => handleTitle(target.value)} />
//       </div>
//       <div>
//         author: <input value={author} onChange={({ target }) => handleAuthor(target.value)} />
//       </div>
//       <div>
//         url: <input value={url} onChange={({ target }) => handleUrl(target.value)} />
//       </div>
//       <button type="submit">create</button>
//     </form>
//   )
// }

const BlogList = ({ username, blogs, handleLogout, handleBlogs, notify }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    if (title === '' || author  === '' || url === '') {
      notify('One of the inputs is empty', 'error')
      return
    }
    try {
      const response = await blogService.create({ title, author, url })
      handleBlogs(response)
      notify(`New blog added: ${title} - by ${author}`, 'alert')
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (ex) {
      notify(ex, 'error')
    }
  }

  return (
    <div>
      <h1>welcome, {username}</h1>
      <button onClick={handleLogout}>logout</button>
      <h2>create new blog</h2>
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

  const [alertMsg, setAlertMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleLogin = () => {
    loginService.login({ username, password, })
      .then(loggedUser => {
        setUser(loggedUser)
        setUsername('')
        setPassword('')
        notify('Successfully logged in', 'alert')
        // add to local storage
        window.localStorage.setItem('user', JSON.stringify(loggedUser))
      })
      .catch(err => {
        console.log(err);
        notify('Wrong username or password', 'error')
      })
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    notify('Successfully logged out', 'alert')

    window.localStorage.removeItem('user')
    blogService.setToken(null)
  }

  // effect for fetching all blogs in the db
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // effect to check if user has already logged in
  useEffect(() => {
    const currentUser = window.localStorage.getItem('user')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (msg, type) => {
    if (type === 'alert') {
      setAlertMsg(msg)
      setTimeout(() => {
        setAlertMsg(null)
      }, 5000)
    }

    if (type === 'error') {
      setErrorMsg(msg)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={alertMsg} type={'alert'} />
      <Notification message={errorMsg} type={'error'} />

      {user === null ? <LoginForm 
        handleLogin={handleLogin}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        username={username}
        password={password} />
        : <BlogList 
            notify={(msg, type) => notify(msg, type)}
            username={user.username} 
            blogs={blogs} 
            handleLogout={handleLogout}
            handleBlogs={(newBlog) => setBlogs(blogs.concat(newBlog))} />}
    </div>
  )
}

export default App