import React, { Component } from 'react'
import { Table, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import cookie from 'react-cookie'
import moment from 'moment'

class User extends Component {
  render() {
    const user = this.props.user
    const renderShowLink = () => {
      if (cookie.load('userRole') === 'admin') {
        return(
          <td>
            <Link to={{ pathname: `/admin/users/${user.id}/calories` }}>
            <Glyphicon glyph="eye-open"/> Show </Link>
          </td>
        )
      }
    }
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.daily_calories_goal}</td>
        <td>{user.entries_count}</td>
        <td>{moment(user.created_at).format('LLL')}</td>
        {renderShowLink()}
        <td>
          <Link to={`/admin/users/edit/${user.id}`}>
          <Glyphicon glyph="pencil"/> Edit </Link>
        </td>
        <td>
          <a href="#" id={"user-" + user.id} onClick={() => this.props.onDeleteUser(user.id)} >
            <Glyphicon glyph="trash"/> Delete
          </a>
        </td>
      </tr>
    )
  }
}

export default User
