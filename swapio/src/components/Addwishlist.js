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

class Addwishlist extends Component {
  state = {
    wishlist: [],
    email: '',
    session: ''
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount = () => {
    const session = cookies.getSession()
    this.setState({ session: session })
  }

  addToWishlist = () => {
    const wishlist = this.state.wishlist.split(',').map(x => x.trim())
    console.log('wishlist :', wishlist)

    axios.post('http://localhost:4000/add-wishlist', {
      items: wishlist
    }, {
      headers: {
        Authorization: this.state.session
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <Form>
        <FormGroup>
          <Label for="Wishlist">Title</Label>
          <Input type="text"
            name="wishlist"
            id="wishlist"
            placeholder="Type in your wanted items separated by commas"
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Col className="text-right">
            <Button onClick={this.addToWishlist}>Add to your wishlist</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default Addwishlist
