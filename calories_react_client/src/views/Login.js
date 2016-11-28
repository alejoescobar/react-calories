import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import requests from '../requestsHelper'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateEmail(e) {
    this.setState({ email: e.target.value })
  }

  updatePassword(e) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const userEmail = this.state.email
    const password = this.state.password
    requests.login(userEmail, password)
    .then((response) => {
      console.log('logged in!')
      console.log(response)
    })
    .catch((error) => {
      console.log('error!')
    })
  }

  render () {
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="email"
            type="email"
            label="Email:"
            placeholder="Enter your email"
            required="true"
            value={this.state.email}
            onChange={this.updateEmail}
          />
          <FieldGroup
            id="password"
            type="password"
            label="Password:"
            placeholder="Enter your password"
            required="true"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <Button bsStyle="success" type="submit">
            Login
          </Button>
        </form>
        Don't have an account? <Link to="/Registration">Register</Link>
    </div>
    )
  }
}

export default Login
