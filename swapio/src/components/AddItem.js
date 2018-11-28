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

class AddItem extends Component {

  state = {
    title: '',
    description: '',
    imgurl: ''
  }

  addItem = () => {
    const item = {
      title: this.state.title,
      description: this.state.description,
      imgurl: this.state.imgurl
    }
    axios.post('http://localhost:4000/add-item', item)
    .then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  handleChange = event => {
  	this.setState({
  		[event.target.name]: event.target.value
  	})
  }

  render () {
    return (
      <div className="Itemaddingform">
        <h2>Add a new item</h2>
        <Form>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input type="text"
             name="title"
             id="title" 
             placeholder="Give a title"
             onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId='formControlsDescription'>
            <Label for="Description">Description</Label>
            <Input
              type='textarea'
              placeholder='Write your description here'
              id="description"
              name='description'
              onChange={this.handleChange}/>
  			  </FormGroup>
          <FormGroup>
            <Label for="imgurl">Img url</Label>
            <Input type="text"
                   name="imgurl"
                   id="imgurl"
                   placeholder="Upload an image"
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button onClick={this.addItem}>Add to item list</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddItem
