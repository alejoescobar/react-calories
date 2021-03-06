import React, { Component } from 'react'
import { userRequests } from '../requestsHelper'
import { browserHistory, Link } from 'react-router'
import CaloriesEntryForm from '../components/CaloriesEntryForm'
import moment from 'moment'

class NewCaloriesEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      caloriesAmount: 0,
      date: moment().format('YYYY-MM-DDTHH:mm'),
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
    const title = this.state.title
    const caloriesAmount = this.state.caloriesAmount
    const date = this.state.date
    userRequests.createCaloriesEntry(title, caloriesAmount, date)
    .then((response) => {
      browserHistory.push('/calories')
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    return (
      <div className="col-sm-8 col-sm-offset-2">
        <Link to="/calories">Back</Link>
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

export default NewCaloriesEntry
