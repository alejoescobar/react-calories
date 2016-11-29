import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap'
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

  render() {
    const calories = this.state.caloriesEntries.map((record, index) =>
      <DailyCalories
        key={index}
        day={record.day}
        caloriesEntries={record.entries}/>
    )
    return (
      <div>
        {calories}
      </div>
    )
  }

}

export default Calories
