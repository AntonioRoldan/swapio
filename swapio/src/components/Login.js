import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import cookies from '../cookies'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  login = () => {
    axios.post('http://localhost:4000/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        cookies.setCookie('session', res.data)
        this.props.update(true)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <div className="login">
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button onClick={this.login}><Link to="/Myswaps">Login</Link></Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Login
