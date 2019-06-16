import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import cookies from '../cookies'

class Login extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
  }

  login = () => {
    axios
      .post('http://localhost:4000/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        cookies.setCookie('session', res.data)
        this.setState({ loggedIn: true })
        this.props.update(true)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    if (this.state.loggedIn) return <Redirect to="/myswaps" />

    return (
      <div className="login">
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Label for="inputEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="with a placeholder"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="password placeholder"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button id="login-button" onClick={this.login}>
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Login
