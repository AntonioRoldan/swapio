import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import { Home, NavBar, Login, Register, SwapList, ItemView, Addwishlist } from './components'
import AddItem from './components/AddItem'
import axios from 'axios'
import cookies from './cookies'

class App extends Component {
  state = {
    loggedIn: false,
    email: '',
    session: ''
  }

  componentDidMount = () => {
    this.getLoginInfo()
  }

  update = loggedIn => {
    if (this.state.loggedIn !== loggedIn) {
      this.setState({ loggedIn: loggedIn })
    }
  }

  getLoginInfo = () => {
    this.setState({
      session: cookies.getSession()
    }, () => {
      axios.get('http://localhost:4000/who-am-i', {
        headers: {
          Authorization: this.state.session
        }
      }).then(res => {
        this.setState({
          email: res.data
        })
      })
    })
  }

  render () {
    return (
      <Router>
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} />
          <br />
          <Container>
            <Route path="/myswaps" exact component={SwapList} />
            <Route path="/" exact component={() => <Home loggedIn={this.state.loggedIn}/>} />
            <Route path="/login" component={() => <Login update={this.update} />} />
            <Route path="/register" component={() => <Register update={this.update} />} />
            <Route path="/addItem" exact component={() => <AddItem email={this.state.email} />} />
            <Route path="/addwishlist" exact component={Addwishlist} />
            <Route path="/item/:itemId/:toUserId?" component={props => <ItemView {...props} />} />
          </Container>
        </div>
      </Router>
    )
  }
}

export default App
