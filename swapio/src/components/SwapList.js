import React, { Component } from 'react'
import axios from 'axios'
import cookies from '../cookies'
import Swap from './Swap/Swap'

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
    return (
      <div className='Swaplist' >
        {swaps.map(s => <Swap key={s.key} swap={s} />)}
      </div>
    )
  }
}

export default SwapList
