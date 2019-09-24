import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({
  handleLogin,
  loginUsername,
  loginPassword
}) => {
  return (
    <div id="loginForm">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input {...loginUsername} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input {...loginPassword} />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm