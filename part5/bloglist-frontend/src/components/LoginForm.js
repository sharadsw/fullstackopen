import React from 'react'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm