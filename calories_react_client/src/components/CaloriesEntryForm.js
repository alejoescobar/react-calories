import React, { Component } from 'react'
import AlertDismissable from '../components/AlertDismissable'
import FieldGroup from '../components/FieldGroup'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

class CaloriesEntryForm extends Component {
  render() {
    const alerts = this.props.errors.map((message, index) =>
      <AlertDismissable key={index} message={message}/>
    )
    return (
      <div>
        <h1>New Calories Entry</h1>
        <hr/>
        {alerts}
        <form onSubmit={this.props.onSubmitForm}>
          <FieldGroup
            id="title"
            type="text"
            label="Title:"
            placeholder="Enter the title of the new entry"
            required="true"
            value={this.props.title}
            onChange={this.props.onUpdateTitle}/>
          <FieldGroup
            id="caloriesAmount"
            type="number"
            label="Calories Amount:"
            placeholder="Enter the amount of calories the new entry"
            required="true"
            value={this.props.caloriesAmount}
            onChange={this.props.onUpdateCaloriesAmount}/>
          <FieldGroup
            id="caloriesAmount"
            type="datetime-local"
            label="Date (mm/dd/yyyy):"
            placeholder="Enter the amount of calories the new entry"
            required="true"
            value={this.props.date}
            onChange={this.props.onUpdateDate}/>
          <Button bsStyle="success" type="submit">
            Create new entry
          </Button>
        </form>
      </div>
    )
  }
}

export default CaloriesEntryForm
