import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import axios from 'axios'
import cookies from '../cookies'
import { Redirect } from 'react-router-dom'

class AddItem extends Component {
  state = {
    session: '',
    title: '',
    description: '',
    imgurl: '',
    addedItemId: '',
  }

  componentDidMount() {
    this.setState({ session: cookies.getSession() })
  }

  addItem = () => {
    axios
      .post(
        'http://localhost:4000/add-item',
        {
          title: this.state.title,
          description: this.state.description,
          imgurl: this.state.imgurl,
        },
        {
          headers: {
            authorization: this.state.session,
          },
        }
      )
      .then(res => {
        this.setState({ addedItemId: res.data._id })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    if (this.state.addedItemId) return <Redirect to={`/item/${this.state.addedItemId}`} />

    return (
      <div className="Itemaddingform">
        <h2>Add a new item</h2>
        <Form>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Give a title"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="formControlsDescription">
            <Label for="Description">Description</Label>
            <Input
              type="textarea"
              placeholder="Write your description here"
              id="description"
              name="description"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="imgurl">Img url</Label>
            <Input
              type="text"
              name="imgurl"
              id="imgurl"
              placeholder="Upload an image"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button id="add-item-button" onClick={this.addItem}>
                Add to item list
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddItem
