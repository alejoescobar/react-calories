import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import requests from '../requestsHelper'
import DailyCalories from '../components/DailyCalories'

class Calories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesEntries: []
    }
  }

  componentDidMount() {
    requests.getCaloriesEntries()
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    })
  }

  newCaloriesEntryPath() {
    browserHistory.push('/calories/new')
  }

  render() {
    const calories = this.state.caloriesEntries.map((record, index) =>
      <DailyCalories
        key={index}
        day={record.day}
        caloriesEntries={record.entries}/>
    )
    return (
      <div>
        <Button bsClass="btn btn-success pull-right" onClick={this.newCaloriesEntryPath}>
          Create new entry
        </Button>
        <h1>Listing Calories</h1>
        <hr/>
        {calories}
      </div>
    )
  }

}

export default Calories
