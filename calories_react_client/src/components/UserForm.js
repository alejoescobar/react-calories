import React, { Component } from 'react'
import FieldGroup from './FieldGroup'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'
import AlertDismissable from './AlertDismissable'

class UserForm extends Component {
  render() {
    const alerts = this.props.errors.map((message, index) =>
      <AlertDismissable key={index} message={message}/>
    )
    return(
      <div className="col-sm-8 col-sm-offset-2">
        <Link to="/admin/users">Back</Link>
        <h1>New User</h1>
        <hr/>
        {alerts}
        <form onSubmit={this.props.onSubmitUser}>
          <FieldGroup
            id="email"
            type="email"
            label="Email:"
            placeholder="Enter your email"
            required="true"
            value={this.props.email}
            onChange={this.props.onUpdateEmail}
          />
          <FieldGroup
            id="password"
            type="password"
            label="Password:"
            placeholder="Enter your password"
            required="true"
            value={this.props.password}
            onChange={this.props.onUpdatePassword}
          />
          <FieldGroup
            id="calories-goal"
            type="number"
            label="Calories goal:"
            placeholder="Enter your calories daily goal"
            required="true"
            value={this.props.caloriesGoal}
            onChange={this.props.onUpdateCaloriesGoal}
          />
          <Button bsStyle="success" type="submit">
            Create user
          </Button>
        </form>
      </div>
    )
  }
}

export default UserForm
