import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import userService from "../services/users"

const UserProfile = (props) => {

  const id = useParams().id

  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUserById(id)
      .then(user => setUser(user))
      .catch(ex => console.log(ex))
  }, [id])

  if (!user) {
    return null
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(b => {
          return <li key={b.id}>{b.title}</li>
        })}
      </ul>
    </div>
  )
}

export default UserProfile