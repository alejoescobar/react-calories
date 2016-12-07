import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import DailyCalories from '../components/DailyCalories'
import EntriesFilter from '../components/EntriesFilter'
import { adminRequests } from '../requestsHelper'
import { browserHistory } from 'react-router'
import { reject } from 'lodash'
import moment from 'moment'

class AdminCalories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesEntries: [],
      startDate: moment().subtract(1, 'month').format('L'),
      endDate: moment().format('L'),
      startTime: moment().startOf('day').format('HH:mm'),
      endTime: moment().endOf('day').format('HH:mm'),
      filtered: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.newCaloriesEntryPath = this.newCaloriesEntryPath.bind(this)
    this.editCaloriesEntryPath = this.editCaloriesEntryPath.bind(this)
    this.updateDateRanges = this.updateDateRanges.bind(this)
    this.updateStartTime = this.updateStartTime.bind(this)
    this.updateEndTime = this.updateEndTime.bind(this)
    this.filterCaloriesEntries = this.filterCaloriesEntries.bind(this)
    this.resetCaloriesEntries = this.resetCaloriesEntries.bind(this)
  }

  componentDidMount() {
    adminRequests.getUserCaloriesEntries(this.props.params.userId)
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    }).catch((error) => {
      if (error.response.status === 401) {
        browserHistory.push('/calories')
      }
    })
  }

  handleDelete(id) {
    const userId = this.props.params.userId
    adminRequests.deleteUserCaloriesEntry(userId, id)
    .then((response) => {
      const filteredEntries = this.state.caloriesEntries.map((obj) =>
        ({ day: obj.day, entries: reject(obj.entries, {id: id}) })
      )
      this.setState({ caloriesEntries: filteredEntries })
    })
  }

  newCaloriesEntryPath() {
    const userId = this.props.params.userId
    browserHistory.push(`/admin/users/${userId}/calories/new`)
  }

  editCaloriesEntryPath(id) {
    const userId = this.props.params.userId
    browserHistory.push(`/admin/users/${userId}/calories/${id}/edit`)
  }

  updateDateRanges(e, picker) {
    this.setState({
      startDate: picker.startDate.format('L'),
      endDate: picker.endDate.format('L')
    })
  }

  updateStartTime(e) {
    this.setState({ startTime: e.target.value })
  }

  updateEndTime(e) {
    this.setState({ endTime: e.target.value })
  }

  filterCaloriesEntries(e) {
    const userId = this.props.params.userId
    const startDate = `start_date=${this.state.startDate}`
    const endDate = `end_date=${this.state.endDate}`
    const startTime = `start_time=${this.state.startTime}`
    const endTime = `end_time=${this.state.endTime}`
    const query = `${startDate}&${endDate}&${startTime}&${endTime}`
    adminRequests.getUserCaloriesEntries(userId, query)
    .then((response) => {
      this.setState({ caloriesEntries: response.data, filtered: true })
    })
  }

  resetCaloriesEntries(e) {
    const userId = this.props.params.userId
    this.setState({
      startDate: moment().subtract(1, 'month').format('L'),
      endDate: moment().format('L'),
      startTime: moment().startOf('day').format('HH:mm'),
      endTime: moment().endOf('day').format('HH:mm')
    })
    adminRequests.getUserCaloriesEntries(userId)
    .then((response) => {
      this.setState({ caloriesEntries: response.data, filtered: false })
    })
  }

  render() {
    const calories = this.state.caloriesEntries.map((record, index) => {
      if (record.entries.length > 0) {
        return <DailyCalories
                  key={index}
                  day={record.day}
                  caloriesEntries={record.entries}
                  filtered={this.state.filtered}
                  onEditCaloriesEntry={this.editCaloriesEntryPath}
                  onDeleteCaloriesEntry={this.handleDelete}/>
      }
    })
    return (
      <div>
        <EntriesFilter
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          onUpdateDateRanges={this.updateDateRanges}
          onUpdateStartTime={this.updateStartTime}
          onUpdateEndTime={this.updateEndTime}
          onFilter={this.filterCaloriesEntries}
          onReset={this.resetCaloriesEntries}/>
        <Button bsClass="btn btn-success pull-right" onClick={this.newCaloriesEntryPath}>
          Create new entry
        </Button>
        <h1>Listing Calories</h1>
        <p>{this.props.location.query.userEmail}</p>
        <hr/>
        {calories}
      </div>
    )
  }
}

export default AdminCalories
