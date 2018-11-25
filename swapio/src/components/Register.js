import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'

import axios from 'axios'
import cookies from '../cookies'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signup = () => {
    axios.post('http://localhost:4000/register', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword
    }).then(res => {
      this.login()
    }).catch(err => {
      console.log(err)
    })
  }

  login = () => {
    axios.post('http://localhost:4000/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      cookies.setCookie('session', res.data)
      this.props.update(true, this.state.email)
    }).catch(err => {
      console.error(err)
    })
  }
  render() {
    return (
      <div className="login">
        <h2>Register</h2>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              onChange={this.handleChange}
               />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button onClick={this.login}>Register</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Register
