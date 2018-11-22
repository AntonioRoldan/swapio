import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'

class Login extends Component {
  render () {
    return (
      <div className="login">
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button>Login</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Login
