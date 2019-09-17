import React from 'react'

const LoginForm = ({ 
  handleLogin, 
  // username, handleUsername, 
  loginUsername,
  // password, handlePassword 
  loginPassword
}) => {
  // let reset
  // const { reset, ...userProps } = loginUsername
  // const { reset, ...passProps } = loginPassword
  return (
    <div id="loginForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          {/* <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          /> */}
          {/* <input {...userProps} /> */}
          <input {...loginUsername} />
        </div>
        <div>
          password
          {/* <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          /> */}
          {/* <input {...passProps} /> */}
          <input {...loginPassword} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm