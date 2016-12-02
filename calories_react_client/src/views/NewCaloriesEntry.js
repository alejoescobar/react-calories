import React, { Component } from 'react'
import requests from '../requestsHelper'
import { browserHistory } from 'react-router'
import CaloriesEntryForm from '../components/CaloriesEntryForm'

class NewCaloriesEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      caloriesAmount: 0,
      date: new Date().toISOString().slice(0,16),
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
    requests.createCaloriesEntry(title, caloriesAmount, date)
    .then((response) => {
      browserHistory.push('/calories')
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    return (
      <CaloriesEntryForm
        onSubmitForm={this.handleSubmit}
        onUpdateTitle={this.updateTitle}
        onUpdateCaloriesAmount={this.updateCaloriesAmount}
        onUpdateDate={this.updateDate}
        title={this.state.title}
        caloriesAmount={this.state.caloriesAmount}
        date={this.state.date}
        errors={this.state.errors}/>
    )
  }
}

export default NewCaloriesEntry