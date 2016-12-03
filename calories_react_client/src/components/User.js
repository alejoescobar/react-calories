import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

class User extends Component {
  render() {
    const user = this.props.user
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.daily_calories_goal}</td>
        <td>{user.created_at}</td>
        <td><Link to={`/admin/users/edit/${user.id}`}> <Glyphicon glyph="pencil"/> Edit </Link></td>
        <td><Link onClick={() => this.props.onDeleteUser(user.id)}> <Glyphicon glyph="trash"/> Delete </Link></td>
      </tr>
    )
  }
}

export default User
