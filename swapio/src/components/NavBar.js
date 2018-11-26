import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import axios from 'axios'
import cookies from '../cookies'

class NavBar extends Component {
  state = {
    session: cookies.getCookie('session'),
    email: '',
    isOpen: false
  }

  componentWillReceiveProps = () => this.checkSession()

  deleteSessionData = () => {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    this.setState({ session: null })
  }

  checkSession = () => {
  	const session = cookies.getCookie('session')
  	this.setState({session: session})

  	axios.post('http://localhost:4000/check-session', {
  		session: session
  	}).then(res => {
  		if (!res.data) {
  			this.deleteSessionData()
  		} else {
        axios.get('http://localhost:4000/who-am-i', {
          headers: {
            Authorization: this.state.session
          }
        }).then(res => {
          this.setState({
            email: res.data
          })
        })  
      }
  	})
  }

  logout = () => {
    axios.post('http://localhost:4000/logout', {
      session: this.state.session
    }).then(() => {
      this.deleteSessionData()
    })
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">swapio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!this.state.session ?
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {this.state.email}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Add Item
                  </DropdownItem>
                    <DropdownItem>
                      View Swap Matches
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout}>
                    <Link to="/">
                      Logout
                    </Link>
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar
