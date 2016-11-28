import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'

class UserNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: ''
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    this.setState({userEmail: sessionStorage.getItem('userEmail')})
  }

  handleLogout() {
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userAuthToken')
    browserHistory.push('/login')
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Calories Entry</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} to="/calories">Calories</NavItem>
              <NavDropdown eventKey={3} title={this.state.userEmail} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>My Settings</MenuItem>
              </NavDropdown>
              <NavItem eventKey={2} onClick={this.handleLogout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default UserNav
