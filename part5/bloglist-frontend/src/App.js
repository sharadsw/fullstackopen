import React, { useState, useEffect } from 'react'

import BlogList from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

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
        // set token in service
        blogService.setToken(loggedUser.token)
      })
      .catch(err => {
        console.log(err)
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

  const handleBlogs = (blogObject) => {
    if (blogObject.title === '' || blogObject.author === '' || blogObject.url === '') {
      notify('One of the inputs is empty', 'error')
      return
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`New blog added: ${returnedBlog.title} - by ${returnedBlog.author}`, 'alert')
      })
      .catch(ex => {
        console.log(ex)
      })
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
        :
        <BlogList
          notify={(msg, type) => notify(msg, type)}
          username={user.username}
          blogs={blogs}
          handleLogout={handleLogout}
          handleBlogs={handleBlogs} />}
    </div>
  )
}

export default App