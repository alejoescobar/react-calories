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
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    adminRequests.getUsers()
    .then((response) => {
      this.setState({ users: response.data })
    }).catch((error) => {
      if (error.response.status === 401) {
        browserHistory.push('/calories')
      }
    })
  }

  handleDelete(id) {
    adminRequests.deleteUser(id)
    .then((response) => {
      const filteredUsers = this.state.users.filter((user) =>
        user.id !== id
      )
      this.setState({ users: filteredUsers })
    })
  }


  newUserPath() {
    browserHistory.push('/admin/users/new')
  }

  render() {
    const users = this.state.users.map((user, index) =>
      <User key={user.id} user={user} onDeleteUser={this.handleDelete} />
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
              <th>Role</th>
              <th>Daily Calories Goal</th>
              <th>Total entries</th>
              <th>Created At</th>
              <th colSpan="3">Options</th>
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
