import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

class Home extends Component {
  render() {
    if (this.props.loggedIn) return <Redirect to="/myswaps" />
    return (
      <div className="home">
        <h1>welcome to swapio</h1>
        <Button outline color="primary" size="lg">
          <Link to="/login">Login</Link>
        </Button>
        <Button outline color="primary" size="lg">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    )
  }
}

export default Home
