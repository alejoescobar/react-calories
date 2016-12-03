import React, { Component } from 'react'
import UserForm from '../components/UserForm'
import { adminRequests } from '../requestsHelper'
import { browserHistory } from 'react-router'

class NewUser extends Component {
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

  handleSubmit(e) {
    e.preventDefault()
    const email = this.state.email
    const password = this.state.password
    const caloriesGoal = this.state.caloriesGoal
    adminRequests.createUser(email, password, caloriesGoal)
    .then((response) => {
      browserHistory.push('/admin/users')
    }).catch((error) => {
      console.log('hello')
      console.log(error.response)
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    return(
      <UserForm
        email={this.state.email}
        password={this.state.password}
        dailyCaloriesGoal={this.state.caloriesGoal}
        onSubmitUser={this.handleSubmit}
        onUpdateEmail={this.updateEmail}
        onUpdatePassword={this.updatePassword}
        onUpdateCaloriesGoal={this.updateCaloriesGoal}
        errors={this.state.errors}/>
    )
  }
}

export default NewUser
