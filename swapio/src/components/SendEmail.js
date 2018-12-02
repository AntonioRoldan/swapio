import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col
} from 'reactstrap'
import axios from 'axios'
import cookies from '../cookies'

class SendEmail extends Component {
  state = {
    session: '',
    message: ''
  }

  componentDidMount = () => {
    this.setState({
      session: cookies.getSession()
    })
  }

  componentDidRecieveProps = newProps => {
    this.setState({
      toUserId: newProps.toUserId
    })
  }

  sendEmail = () => {
    console.log('this.state :', this.state)
    axios.post('http://localhost:4000/send-message', {
      to: this.state.toUserId,
      message: this.state.message
    }, {
      headers: {
        Authorization: this.state.session
      }
    })
      .then(res => {
        console.log('res :', res)
      })
      .catch(err => {
        console.log('err :', err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <Form className="mt-3">
        <FormGroup>
          <Input
            type='textarea'
            placeholder='Write your message'
            id='message'
            name='message'
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Col className="text-right">
            <Button onClick={this.sendEmail}>Send your message!</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default SendEmail
