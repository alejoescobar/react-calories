import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import { userRequests } from '../requestsHelper'
import { LinkContainer } from 'react-router-bootstrap'
import cookie from 'react-cookie'

class UserNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: ''
    }
    console.log(cookie.load('userRole') === 'admin')
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    this.setState({userEmail: cookie.load('userEmail')})
  }

  handleLogout(e) {
    e.preventDefault()
    userRequests.logout()
    .then((response) => {
      cookie.remove('userId')
      cookie.remove('userEmail')
      cookie.remove('userAuthToken')
      cookie.remove('userRole')
      cookie.remove('userCaloriesGoal')
      browserHistory.push('/login')
    })
  }

  render() {
    const userRole = cookie.load('userRole')
    const adminLink = () => {
      if (userRole === 'admin') {
        return(
          <LinkContainer to={{ pathname: '/admin/users'}}>
            <NavItem eventKey={4}>Admin Users</NavItem>
          </LinkContainer>
        )
      }
    }
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
              <LinkContainer to={{ pathname: '/calories'}}>
                <NavItem eventKey={1}>My Calories</NavItem>
              </LinkContainer>
              {adminLink()}
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
