import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import DailyCalories from '../components/DailyCalories'
import { adminRequests } from '../requestsHelper'
import { browserHistory } from 'react-router'

class AdminCalories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesEntries: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    adminRequests.getUserCaloriesEntries(this.props.params.userId)
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    })
  }

  handleDelete(id) {
    // userRequests.deleteCaloriesEntry(id)
    // .then((response) => {
    //   const filteredEntries = this.state.caloriesEntries.map((obj) =>
    //     ({ day: obj.day, entries: reject(obj.entries, {id: id}) })
    //   )
    //   this.setState({ caloriesEntries: filteredEntries })
    // })
  }

  newCaloriesEntryPath() {
    browserHistory.push('/calories/new')
  }

  updateDateRanges(e, picker) {
    this.setState({
      startDate: picker.startDate.format('L'),
      endDate: picker.endDate.format('L')
    })
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

export default AdminCalories
