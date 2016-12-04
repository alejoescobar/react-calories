import React, { Component } from 'react'
import { adminRequests } from '../requestsHelper'
import { browserHistory, Link } from 'react-router'
import CaloriesEntryForm from '../components/CaloriesEntryForm'
import moment from 'moment'

class AdminEditCaloriesEntry extends Component {
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
    const userId = this.props.params.userId
    const id = this.props.params.id
    adminRequests.showUserCaloriesEntry(userId, id)
    .then((response) => {
      const caloriesEntry = response.data
      this.setState({
        id: caloriesEntry.id,
        title: caloriesEntry.title,
        caloriesAmount: caloriesEntry.calories_amount,
        date: moment(`${caloriesEntry.day} ${caloriesEntry.time}`).format('YYYY-MM-DDTkk:mm')
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
    const userId = this.props.params.userId
    const id = this.props.params.id
    const title = this.state.title
    const caloriesAmount = this.state.caloriesAmount
    const date = this.state.date
    adminRequests.updateUserCaloriesEntry(userId, id, title, caloriesAmount, date)
    .then((response) => {
      browserHistory.push(`/admin/users/${userId}/calories`)
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors })
    })
  }

  render() {
    const userId = this.props.params.userId
    return (
      <div className="col-sm-8 col-sm-offset-2">
        <Link to={`/admin/users/${userId}/calories`}>Back</Link>
        <CaloriesEntryForm
          header={{title: 'Edit', button: 'Update'}}
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

export default AdminEditCaloriesEntry
