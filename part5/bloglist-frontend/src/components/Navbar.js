import React from "react"

import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

const Navbar = ({ handleLogout }) => {

  const user = useSelector(state => state.user)

  return (
    <div>
      <div className="navbar">
        <Link to="/" className="m5">blogs</Link>
        <Link to="/users" className="m5">users</Link>
        <span className="m5">welcome, {user.username}</span>
        <button onClick={handleLogout} className="m5">logout</button>
      </div>
      <h1>blog app</h1>
    </div>
  )
}

export default Navbar