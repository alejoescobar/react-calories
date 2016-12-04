import React, { Component } from 'react'
import { adminRequests } from '../requestsHelper'
import { browserHistory, Link } from 'react-router'
import CaloriesEntryForm from '../components/CaloriesEntryForm'
import moment from 'moment'

class AdminNewCaloriesEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      caloriesAmount: 0,
      date: moment().format('YYYY-MM-DDTkk:mm'),
      errors: []
    }
    this.updateTitle = this.updateTitle.bind(this)
    this.updateCaloriesAmount = this.updateCaloriesAmount.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  updateCaloriesAmount(e) {
    this.setState({ caloriesAmount: e.target.value })
  }

  updateDate(e) {
    this.setState({ date: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.params.userId
    const title = this.state.title
    const caloriesAmount = this.state.caloriesAmount
    const date = this.state.date
    adminRequests.createUserCaloriesEntry(id, title, caloriesAmount, date)
    .then((response) => {
      browserHistory.push(`/admin/users/${id}/calories`)
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    const userId = this.props.params.userId
    return (
      <div className="col-sm-8 col-sm-offset-2">
        <Link to={`/admin/users/${userId}/calories`}>Back</Link>
        <CaloriesEntryForm
          header={{title: 'New', button: 'Create'}}
          onSubmitForm={this.handleSubmit}
          onUpdateTitle={this.updateTitle}
          onUpdateCaloriesAmount={this.updateCaloriesAmount}
          onUpdateDate={this.updateDate}
          title={this.state.title}
          caloriesAmount={this.state.caloriesAmount}
          date={this.state.date}
          errors={this.state.errors}/>
      </div>
    )
  }
}

export default AdminNewCaloriesEntry
