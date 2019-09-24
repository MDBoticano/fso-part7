import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({
  handleLogin,
  loginUsername,
  loginPassword
}) => {
  return (
    <div id="loginForm">
      <Form unstackable size="mini" onSubmit={handleLogin}>
        <Form.Group widths="equal" style={{ marginBottom: 0 }}>
          <div className="twelve wide field">
            <label>username</label>
            <div className="ui input">
              <input {...loginUsername} />
            </div>
          </div>
          <div className="twelve wide field">
            <label>password</label>
            <input {...loginPassword} />
          </div>
          <Button type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm