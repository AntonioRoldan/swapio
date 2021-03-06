import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import cookies from '../cookies'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    registered: false,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  signup = () => {
    axios
      .post('http://localhost:4000/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
      })
      .then(res => {
        this.setState({ registered: true })
        this.login()
      })
      .catch(err => {
        console.log(err)
      })
  }

  login = () => {
    axios
      .post('http://localhost:4000/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        cookies.setCookie('session', res.data)
        this.props.update(true, this.state.email)
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    if (this.state.registered) return <Redirect to="/myswaps" />

    return (
      <div className="login">
        <h2>Register</h2>
        <Form>
          <FormGroup>
            <Label for="inputEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Give email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Give a password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button id="register-button" onClick={this.signup}>
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Register
