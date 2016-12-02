import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

class DailyCalories extends Component {
  render() {
    const caloriesEntries = this.props.caloriesEntries.map((entry) =>
      <tr key={entry.id}>
        <td>{entry.id}</td>
        <td>{entry.title}</td>
        <td>{entry.day}</td>
        <td>{entry.time}</td>
        <td>{entry.calories_amount}</td>
        <td><Link to={'/calories/edit/' + entry.id}> <Glyphicon glyph="pencil"/> Edit </Link></td>
        <td><Link onClick={() => this.props.onDeleteCaloriesEntry(entry.id)}> <Glyphicon glyph="trash"/> Delete </Link></td>
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
                <th colSpan="2">Options</th>
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
