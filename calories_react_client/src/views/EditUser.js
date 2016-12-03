import React, { Component } from 'react'
import UserForm from '../components/UserForm'
import { adminRequests } from '../requestsHelper'
import { browserHistory } from 'react-router'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      email: '',
      password: '',
      caloriesGoal: 0,
      role: 'user',
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateRole = this.updateRole.bind(this)
    this.updateCaloriesGoal = this.updateCaloriesGoal.bind(this)
  }

  componentDidMount() {
    adminRequests.showUser(this.props.params.userId)
    .then((response) => {
      const user = response.data
      this.setState({
        id: user.id,
        email: user.email,
        role: user.role,
        caloriesGoal: user.daily_calories_goal
      })
    })
  }

  updateEmail(e) {
    this.setState({ email: e.target.value })
  }

  updatePassword(e) {
    this.setState({ password: e.target.value })
  }

  updateRole(e) {
    this.setState({ role: e.target.value })
  }

  updateCaloriesGoal(e) {
    this.setState({ caloriesGoal: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.state.id
    const email = this.state.email
    const password = this.state.password
    const role = this.state.role
    const caloriesGoal = this.state.caloriesGoal
    adminRequests.updateUser(id, email, password, role, caloriesGoal)
    .then((response) => {
      browserHistory.push('/admin/users')
    }).catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    return(
      <UserForm
        email={this.state.email}
        password={this.state.password}
        role={this.state.role}
        caloriesGoal={this.state.caloriesGoal}
        onSubmitUser={this.handleSubmit}
        onUpdateEmail={this.updateEmail}
        onUpdatePassword={this.updatePassword}
        onUpdateRole={this.updateRole}
        onUpdateCaloriesGoal={this.updateCaloriesGoal}
        errors={this.state.errors}/>
    )
  }
}

export default EditUser
