import React, { Component } from 'react'
import './ItemView.css'
import axios from 'axios'
import cookies from '../../cookies'
import { SendEmail } from '../../components'
import { Button, Collapse } from 'reactstrap'

class ItemView extends Component {
  state = {
    item: {},
    contact: false,
    session: ''
  }

  getItemDetails = () => {
    axios.get('http://localhost:4000/item-details', {
      headers: {
        Authorization: this.props.match.params.itemId
      }
    }).then(res => {
      this.setState({
        item: res.data
      })
    })
  }

  componentDidMount = () => {
    this.setState({
      session: cookies.getSession(),
      itemId: this.props.match.params.itemId,
      toUserId: this.props.match.params.toUserId
    }, () => {
      this.getItemDetails()
    })
  }

  toggleContact = () => {
    this.setState({ contact: !this.state.contact })
  }

  render () {
    const item = this.state.item
    return (
      <div className="mb-4">
        <img src={item.imgurl || 'https://via.placeholder.com/200x200'} alt='item' className='advertimg' />
        <div className='details'>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div>
          <Button color="secondary" onClick={this.toggleContact}>Contact</Button>

          <Collapse isOpen={this.state.contact}>
            <SendEmail toUserId={this.state.toUserId} />
          </Collapse>
        </div>
      </div>
    )
  }
}

export default ItemView
