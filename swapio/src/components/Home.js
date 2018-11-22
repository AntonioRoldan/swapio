import React, { Component } from 'react'
import { Button } from 'reactstrap'

class Home extends Component {
  render () {
    return (
      <div className="home">
        <h1>welcome to swapio</h1>
        <Button outline color="primary" size="lg">Login</Button>
        <Button color="primary" size="lg">Register</Button>
      </div>
    )
  }
}

export default Home
