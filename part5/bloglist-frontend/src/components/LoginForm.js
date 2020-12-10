import React, { useState } from 'react'

const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {

  return (
    <div>
      <h1>Login to the app</h1>
      <div>
        username: <input type="email" value={username} onChange={handleUsername} />
      </div>
      <div>
        password: <input type="password" value={password} onChange={handlePassword} />
      </div>
      <button type="submit" onClick={() => handleLogin(username, password)}>login</button>
    </div>
  )
}

export default LoginForm