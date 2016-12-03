import React, { Component } from 'react'
import { userRequests } from '../requestsHelper'
import { browserHistory } from 'react-router'
import CaloriesEntryForm from '../components/CaloriesEntryForm'

class EditCaloriesEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      title: '',
      caloriesAmount: 0,
      date: '',
      errors: []
    }
    this.updateTitle = this.updateTitle.bind(this)
    this.updateCaloriesAmount = this.updateCaloriesAmount.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    userRequests.showCaloriesEntry(this.props.params.entryId)
    .then((response) => {
      const caloriesEntry = response.data
      this.setState({
        id: caloriesEntry.id,
        title: caloriesEntry.title,
        caloriesAmount: caloriesEntry.calories_amount,
        date: new Date(`${caloriesEntry.day} ${caloriesEntry.time}`).toISOString().slice(0,16)
      })
    })
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
    const id = this.state.id
    const title = this.state.title
    const caloriesAmount = this.state.caloriesAmount
    const date = this.state.date
    userRequests.updateCaloriesEntry(id, title, caloriesAmount, date)
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

export default EditCaloriesEntry
