import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import { Button } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import AlertDismissable from '../components/AlertDismissable'
import requests from '../requestsHelper'

class Registration extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      caloriesGoal: 0,
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateCaloriesGoal = this.updateCaloriesGoal.bind(this)
  }

  updateEmail(e) {
    this.setState({ email: e.target.value })
  }

  updatePassword(e) {
    this.setState({ password: e.target.value })
  }

  updateCaloriesGoal(e) {
    this.setState({ caloriesGoal: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const userEmail = this.state.email
    const password = this.state.password
    const caloriesGoal = this.state.caloriesGoal
    requests.register(userEmail, password, caloriesGoal)
    .then((response) => {
      browserHistory.push('/login')
    }).catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render () {
    const alerts = this.state.errors.map((message, index) =>
      <AlertDismissable key={index} message={message}/>
    )
    return (
      <div className="col-sm-4 col-sm-offset-4">
        <h1>Registration</h1>
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
          <FieldGroup
            id="calories-goal"
            type="number"
            label="Calories goal:"
            placeholder="Enter your calories daily goal"
            required="true"
            value={this.state.caloriesGoal}
            onChange={this.updateCaloriesGoal}
          />
          <Button bsStyle="success" type="submit">
            Register
          </Button>
        </form>
        Already have an account? <Link to="/login">Login</Link>
    </div>
    )
  }
}

export default Registration
