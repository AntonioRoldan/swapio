import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import { Home, NavBar, Login, Register } from './components'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <br />
          <Container>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Container>
        </div>
      </Router>
    )
  }
}

export default App
