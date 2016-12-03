import React, { Component } from 'react'
import User from '../components/User'
import { adminRequests } from '../requestsHelper'
import { Button, Table } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    adminRequests.getUsers()
    .then((response) => {
      this.setState({ users: response.data })
    })
  }

  newUserPath() {
    browserHistory.push('/admin/users/new')
  }

  render() {
    const users = this.state.users.map((user, index) =>
      <User key={user.id} user={user} />
    )
    return (
      <div>
        <Button bsClass="btn btn-success pull-right" onClick={this.newUserPath}>
          Create new user
        </Button>
        <h1>Listing Users</h1>
        <hr/>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Daily Calories Goal</th>
              <th>Created At</th>
              <th colSpan="2">Options</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Users