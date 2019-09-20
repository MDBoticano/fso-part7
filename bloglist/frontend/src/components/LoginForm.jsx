import React from 'react'

const LoginForm = ({
  handleLogin,
  loginUsername,
  loginPassword
}) => {
  return (
    <div id="loginForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...loginUsername} />
        </div>
        <div>
          password
          <input {...loginPassword} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm