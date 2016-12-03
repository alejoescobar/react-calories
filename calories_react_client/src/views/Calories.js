import React, { Component } from 'react'
import { Button, FormControl, InputGroup, Glyphicon, Form } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { userRequests } from '../requestsHelper'
import DailyCalories from '../components/DailyCalories'
import { reject } from 'lodash'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import '../dateRangePicker.css';

class Calories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caloriesEntries: [],
      startDate: moment().subtract(1, 'month').format('L'),
      endDate: moment().format('L'),
      startTime: moment().startOf('day').format('HH:mm'),
      endTime: moment().endOf('day').format('HH:mm')
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.updateDateRanges = this.updateDateRanges.bind(this)
    this.updateStartTime = this.updateStartTime.bind(this)
    this.updateEndTime = this.updateEndTime.bind(this)
    this.filterCaloriesEntries = this.filterCaloriesEntries.bind(this)
    this.resetCaloriesEntries = this.resetCaloriesEntries.bind(this)
  }

  componentDidMount() {
    userRequests.getCaloriesEntries()
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    })
  }

  handleDelete(id) {
    userRequests.deleteCaloriesEntry(id)
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
    const startDate = `start_date=${this.state.startDate}`
    const endDate = `end_date=${this.state.endDate}`
    const startTime = `start_time=${this.state.startTime}`
    const endTime = `end_time=${this.state.endTime}`
    const query = `${startDate}&${endDate}&${startTime}&${endTime}`
    userRequests.getCaloriesEntries(query)
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
    })
  }

  resetCaloriesEntries(e) {
    this.setState({
      startDate: moment().subtract(1, 'month').format('L'),
      endDate: moment().format('L'),
      startTime: moment().startOf('day').format('HH:mm'),
      endTime: moment().endOf('day').format('HH:mm')
    })
    userRequests.getCaloriesEntries()
    .then((response) => {
      this.setState({ caloriesEntries: response.data })
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
    const startDate = this.state.startDate
    const endDate = this.state.endDate
    const dateRange = `${startDate} - ${endDate}`
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <DateRangePicker startDate={startDate} endDate={endDate} onApply={this.updateDateRanges}>
              <InputGroup>
                <FormControl value={dateRange} />
                <InputGroup.Addon>
                  <Glyphicon glyph="calendar" />
                </InputGroup.Addon>
              </InputGroup>
            </DateRangePicker>
          </div>
          <div className="col-md-3">
            <Form inline>
              <FormControl type="time" value={this.state.startTime} onChange={this.updateStartTime} />
              <FormControl type="time" value={this.state.endTime} onChange={this.updateEndTime} />
            </Form>
          </div>
          <Button bsClass="btn btn-default" onClick={this.filterCaloriesEntries}>
            Filter <Glyphicon glyph="search" />
          </Button>
          <Button bsClass="btn btn-default" onClick={this.resetCaloriesEntries}>
            Reset <Glyphicon glyph="repeat" />
          </Button>
        </div>
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
