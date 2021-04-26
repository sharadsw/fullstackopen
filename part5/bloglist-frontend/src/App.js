import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux"

import { init, addBlog } from "./reducers/blogReducer"
import { setNotification } from "./reducers/notificationReducer"
import { login, logout } from "./reducers/userReducer"

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blog from "./components/Blog"
import Navbar from "./components/Navbar"

import Users from "./components/Users"
import UserProfile from "./components/UserProfile"

import blogService from './services/blogs'
import loginService from './services/login'

import { Switch, Route, useRouteMatch } from "react-router-dom"

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])

  const blogs = useSelector(state => state.blogs)
  const alertMsg = useSelector(state => state.notifications.alert)
  const errorMsg = useSelector(state => state.notifications.error)
  
  const user = useSelector(state => state.user)

  // const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const [alertMsg, setAlertMsg] = useState(null)
  // const [errorMsg, setErrorMsg] = useState(null)

  const handleLogin = () => {
    loginService.login({ username, password })
      .then(loggedUser => {
        dispatch(login(loggedUser))
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
    dispatch(logout())
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
    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     returnedBlog.user = {
    //       username: ''
    //     }
    //     returnedBlog.user.username = user.username
    //     setBlogs(blogs.concat(returnedBlog))
    //     notify(`New blog added: ${returnedBlog.title} - by ${returnedBlog.author}`, 'alert')
    //   })
    //   .catch(ex => {
    //     console.log(ex)
    //   })
    dispatch(addBlog(blogObject, user.username))
    notify(`New blog added: ${blogObject.title} - by ${blogObject.author}`, 'alert')
  }

  /*   const updateBlogs = (blogObject, id) => {
      blogService
        .update(blogObject, id)
        .then(updatedBlog => {
          setBlogs(blogs.map(blog => blog.id === updatedBlog ? updatedBlog : blog))
        })
        .catch(ex => {
          console.log(ex)
        })
    }
  
    const deleteBlog = (id) => {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(ex => {
          console.log(ex)
        })
    } */

  // effect for fetching all blogs in the db
  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(blogs)
    // )
    dispatch(init())
  }, [dispatch])

  // effect to check if user has already logged in
  useEffect(() => {
    const currentUser = window.localStorage.getItem('user')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (msg, type) => {
    // if (type === 'alert') {
    //   setAlertMsg(msg)
    //   setTimeout(() => {
    //     setAlertMsg(null)
    //   }, 5000)
    // }

    // if (type === 'error') {
    //   setErrorMsg(msg)
    //   setTimeout(() => {
    //     setErrorMsg(null)
    //   }, 5000)
    // }
    dispatch(setNotification(type, msg, 5))
  }

  const match = useRouteMatch("/blogs/:id")

  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  return (
    <div>
      <Notification message={alertMsg} type={'alert'} />
      <Notification message={errorMsg} type={'error'} />

      {user &&
        <Navbar
          handleLogout={handleLogout}
        />
      }

      <Switch>
        <Route path="/users/:id">
          <UserProfile />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            blog={blog}
          />
        </Route>
        <Route path="/">
          {!user ?
            <LoginForm
              handleLogin={handleLogin}
              handleUsername={({ target }) => setUsername(target.value)}
              handlePassword={({ target }) => setPassword(target.value)}
              username={username}
              password={password} 
            />
            :
            <BlogList
              blogs={blogs}
              handleBlogs={handleBlogs} 
            />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App