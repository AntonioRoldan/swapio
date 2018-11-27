import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ItemView.css'
import axios from 'axios';


  class ItemView extends Component {
    state = {
     item: {} 
    }
    getItemDetails = () => {
      axios.get('http://localhost:4000/item-details', {
        headers: {
          Authorization: this.props.match.params.id
        }
      }).then(res => {
        this.setState({
          item: res.data
        })
      })
    }
    componentDidMount = () => {
      this.getItemDetails()
    }
    render() {
      const item = this.state.item
      return(
        <div>
  				<img src={item.imgurl || 'https://via.placeholder.com/200x200'} alt='item' class='advertimg'/>
  				<div className='details'>
  					<h2>{item.title}</h2>
  					<p>{item.description}</p>
  				</div>
  				<Link to="#">Send email to {item.email}</Link>
  			</div>
      )
    }
  }

  export default ItemView