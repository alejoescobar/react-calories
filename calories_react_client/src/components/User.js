import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import moment from 'moment'

class User extends Component {
  render() {
    const user = this.props.user
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.daily_calories_goal}</td>
        <td>{moment(user.created_at).format('LLL')}</td>
        <td>
          <Link to={`/admin/users/${user.id}/calories_entries`}>
          <Glyphicon glyph="eye-open"/> Show </Link>
        </td>
        <td>
          <Link to={`/admin/users/edit/${user.id}`}>
          <Glyphicon glyph="pencil"/> Edit </Link>
        </td>
        <td>
          <Link onClick={() => this.props.onDeleteUser(user.id)}>
          <Glyphicon glyph="trash"/> Delete </Link>
        </td>
      </tr>
    )
  }
}

export default User
