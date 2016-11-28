import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

class Login extends Component {

  handleSubmit(event) {
    event.preventDefault()
    const userEmail = event.target.elements[0].value
    const password = event.target.elements[1].value
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
          />
          <FieldGroup
            id="password"
            type="password"
            label="Password:"
            placeholder="Enter your password"
            required="true"
          />
          <Button bsStyle="success" type="submit">
            Register
          </Button>
        </form>
        Don't have an account? <Link to="/Registration">Register</Link>
    </div>
    )
  }
}

export default Login
