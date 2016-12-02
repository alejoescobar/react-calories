import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import requests from '../requestsHelper'
import DailyCalories from '../components/DailyCalories'
import { reject } from 'lodash'


class Calories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesEntries: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    requests.getCaloriesEntries()
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    })
  }

  handleDelete(id) {
    requests.deleteCaloriesEntry(id)
    .then((response) => {
      const filteredEntries = this.state.caloriesEntries.map((obj) =>
        ({ day: obj.day, entries: reject(obj.entries, {id: id}) })
      )
      this.setState({ caloriesEntries: filteredEntries })
    })
  }

  newCaloriesEntryPath() {
    browserHistory.push('/calories/new')
  }

  render() {
    const calories = this.state.caloriesEntries.map((record, index) => {
      if (record.entries.length > 0) {
        return <DailyCalories
                  key={index}
                  day={record.day}
                  caloriesEntries={record.entries}
                  onDeleteCaloriesEntry={this.handleDelete}/>
      }
    })
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
