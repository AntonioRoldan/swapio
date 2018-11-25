import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'

class AddItem extends Component {
  render () {
    return (
      <div className="Itemaddingform">
        <h2>Register</h2>
        <Form>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input type="text" name="title" id="title" placeholder="Give a title" />
          </FormGroup>
          <FormGroup controlId='formControlsDescription'>
            <Label for="Description">Description</Label>
            <Input
              type='textarea'
              placeholder='Write your description here'
              id="description"
              name='description'/>
  			  </FormGroup>
          <FormGroup>
            <Label for="imgurl">Img url</Label>
            <Input type="text" name="imgurl" id="imgurl" placeholder="Upload an image" />
          </FormGroup>
          <FormGroup>
            <Col className="text-right">
              <Button>Add to item list</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddItem
