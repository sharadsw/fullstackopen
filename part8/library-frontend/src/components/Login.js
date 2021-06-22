import React, { useEffect } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'

const Login = ({ setToken }) => {

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
      <input type="text" name="username" />
      </div>
      <div>
        Password:
      <input type="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
};

export default Login
