import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import { userRequests } from '../requestsHelper'
import AlertDismissable from '../components/AlertDismissable'
import { Button } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: []
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
    userRequests.login(userEmail, password)
    .then((response) => {
      const user = response.data
      cookie.save('userId', user.id, { path: '/' })
      cookie.save('userEmail', user.email, { path: '/' })
      cookie.save('userRole', user.role, { path: '/' })
      cookie.save('userCaloriesGoal', user.daily_calories_goal, { path: '/' })
      browserHistory.push('/calories')
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render () {
    const alerts = this.state.errors.map((message, index) =>
      <AlertDismissable key={index} message={message}/>
    )
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1>Login</h1>
        {alerts}
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
        Don't have an account? <Link to="/">Register</Link>
    </div>
    )
  }
}

export default Login
