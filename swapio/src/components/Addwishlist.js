import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import axios from 'axios'
import cookies from '../cookies'

class Addwishlist extends Component {
  state = {
    wishlist: '',
    dbWishlist: [],
    email: '',
    session: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount = () => {
    const session = cookies.getSession()
    this.setState({ session: session }, () => {
      this.addToWishlist([])
    })
  }

  addToWishlist = () => {
    const wishlist =
      this.state.wishlist
        .split(',')
        .map(x => x.trim())
        .filter(x => x) || []

    axios
      .post(
        'http://localhost:4000/add-wishlist',
        {
          items: wishlist,
        },
        {
          headers: {
            Authorization: this.state.session,
          },
        }
      )
      .then(res => {
        console.log(res)
        this.setState({ dbWishlist: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="wishlist">Title</Label>
            <Input
              type="text"
              name="wishlist"
              id="input-wishlist"
              placeholder="Type in your wanted items separated by commas"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button id="addWishlist" onClick={this.addToWishlist}>
                Add to your wishlist
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <br />
        <ul id="dbwishlist">
          {this.state.dbWishlist.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Addwishlist
