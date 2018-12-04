import React, { Component } from 'react'
import axios from 'axios'
import cookies from '../cookies'
import Swap from './Swap/Swap'
import { Link } from 'react-router-dom'

class SwapList extends Component {
  state = {
    swaps: [],
    session: ''
  }

  componentDidMount = () => {
    this.setState({
      session: cookies.getSession()
    }, () => {
      axios.get('http://localhost:4000/my-swaps', {
        headers: {
          Authorization: this.state.session
        }
      })
        .then(res => {
          this.setState({
            swaps: res.data
          })
        })
        .catch(error => {
          console.error(error)
        })
    })
  }
  render () {
    const swaps = this.state.swaps

    console.log('swaps :', swaps)

    if (!swaps || swaps.length === 0) {
      return (
        <div>
          <h3>No swaps found :(</h3>
          <p>try adding items to your <Link to='/addwishlist'>wishlist</Link>!</p>
        </div>
      )
    }

    return (
      <div className='Swaplist' >
        {swaps.map(s => <Swap key={s.key} swap={s} />)}
      </div>
    )
  }
}

export default SwapList
