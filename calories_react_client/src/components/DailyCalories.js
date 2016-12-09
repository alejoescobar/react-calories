import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Glyphicon, Label } from 'react-bootstrap'
import { Link } from 'react-router'
import cookie from 'react-cookie'

class DailyCalories extends Component {

  caloriesTotal() {
    const dailyAmount = this.props.caloriesEntries.reduce((sum, obj) =>
      sum + obj.calories_amount, 0
    )
    const dailyCaloriesGoal = this.props.userCaloriesGoal ?
                              this.props.userCaloriesGoal :
                              cookie.load('userCaloriesGoal')
    const caloriesDifference = () => {
      const difference = dailyCaloriesGoal - dailyAmount
      if (difference < 0) {
        return (
          <span>
            Extra Calories: { difference * -1 }
          </span>
        )
      } else {
        return(
          <span>
            Remaining Calories: { difference }
          </span>
        )
      }
    }
    if (this.props.filtered) {
      return (
        <p>
          Goal: { dailyCaloriesGoal }, Calories Consumed: { dailyAmount },
          Calories remaining: { dailyCaloriesGoal - dailyAmount }
        </p>
      )
    } else {
      return(
        <p>
          {
            dailyAmount <= dailyCaloriesGoal ?
            <Label bsStyle="success">Success</Label> :
            <Label bsStyle="danger">Fail</Label>
          } &nbsp;
          Goal: { dailyCaloriesGoal }, Calories Consumed: { dailyAmount },
          &nbsp; { caloriesDifference() }
        </p>
      )
    }
  }

  render() {
    const caloriesEntries = this.props.caloriesEntries.map((entry) =>
      <tr key={entry.id}>
        <td>{entry.id}</td>
        <td>{entry.title}</td>
        <td>{entry.day}</td>
        <td>{entry.time}</td>
        <td>{entry.calories_amount}</td>
        <td>
          <Link onClick={() => this.props.onEditCaloriesEntry(entry.id)}>
          <Glyphicon glyph="pencil"/> Edit </Link>
        </td>
        <td>
          <Link id={"entry-" + entry.id} onClick={() => this.props.onDeleteCaloriesEntry(entry.id)}>
          <Glyphicon glyph="trash" /> Delete </Link>
        </td>
      </tr>
    )
    return (
      <ListGroup>
        <li className="list-group-item">
          <h4>{this.props.day}</h4>
          {this.caloriesTotal()}
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
