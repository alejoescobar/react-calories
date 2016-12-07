import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import { Button } from 'react-bootstrap'
import { userRequests } from '../requestsHelper'
import { browserHistory, Link } from 'react-router'
import cookie from 'react-cookie'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesGoal: cookie.load('userCaloriesGoal')
    }
    this.updateCaloriesGoal = this.updateCaloriesGoal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateCaloriesGoal(e) {
    this.setState({ caloriesGoal: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const caloriesGoal = this.state.caloriesGoal
    userRequests.updateInfo(cookie.load('userId'), caloriesGoal)
    .then((response) => {
      const user = response.data
      cookie.save('userCaloriesGoal', user.daily_calories_goal, { path: '/' })
      browserHistory.push('/calories')
    })
  }

  render() {
    return(
      <div className="col-sm-8 col-sm-offset-2">
        <Link to="/calories">Back</Link>
        <h1>Update Settings</h1>
        <form onSubmit={this.handleSubmit}>
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
            Update Settings
          </Button>
        </form>
      </div>
    )
  }
}

export default Settings
