import React, { Component } from 'react'
import FieldGroup from '../components/FieldGroup'
import { Button } from 'react-bootstrap'
import requests from '../requestsHelper'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import AlertDismissable from '../components/AlertDismissable'

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
      console.log(error);
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    const alerts = this.state.errors.map((message, index) =>
      <AlertDismissable key={index} message={message}/>
    )
    return (
      <div>
        <div className="col-sm-8 col-sm-offset-2">
          <Link to="/calories">Back</Link>
          <h1>New Calories Entry</h1>
          <hr/>
          {alerts}
          <form onSubmit={this.handleSubmit}>
            <FieldGroup
              id="title"
              type="text"
              label="Title:"
              placeholder="Enter the title of the new entry"
              required="true"
              value={this.state.title}
              onChange={this.updateTitle}/>
            <FieldGroup
              id="caloriesAmount"
              type="number"
              label="Calories Amount:"
              placeholder="Enter the amount of calories the new entry"
              required="true"
              value={this.state.caloriesAmount}
              onChange={this.updateCaloriesAmount}/>
            <FieldGroup
              id="caloriesAmount"
              type="datetime-local"
              label="Date (mm/dd/yyyy):"
              placeholder="Enter the amount of calories the new entry"
              required="true"
              value={this.state.date}
              onChange={this.updateDate}/>
            <Button bsStyle="success" type="submit">
              Create new entry
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewCaloriesEntry
