import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap'

class DailyCalories extends Component {
  render() {
    const caloriesEntries = this.props.caloriesEntries.map((entry) =>
      <tr key={entry.id}>
        <td>{entry.id}</td>
        <td>{entry.title}</td>
        <td>{entry.day}</td>
        <td>{entry.time}</td>
        <td>{entry.calories_amount}</td>
      </tr>
    )
    const dailyAmount = this.props.caloriesEntries.reduce((sum, obj) =>
      sum + obj.calories_amount, 0
    )
    const dailyCaloriesGoal = sessionStorage.getItem('userCaloriesGoal')
    return (
      <ListGroup>
        <li className="list-group-item">
          <h4>{this.props.day}</h4>
          {dailyAmount < dailyCaloriesGoal ? 'success' : 'fail'}
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Calories Amount</th>
              </tr>
            </thead>
            <tbody>
              {caloriesEntries}
            </tbody>
          </Table>
        </li>
      </ListGroup>
    )
  }
}

export default DailyCalories
