import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import userService from "../services/users"

const Users = (props) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(users => setUsers(users))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th>
            username
        </th>
          <th>
            blogs created
        </th>
        </tr>
        {users.map(u => {
          return (
          <tr>
            <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>)
        })
        }
      </table>
    </div>
  )
}

export default Users