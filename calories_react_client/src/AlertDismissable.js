import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class AlertDismissable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertVisible: true
    }
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <p>{this.props.message}</p>
        </Alert>
      )
    } else {
      return null
    }
  }

}

export default AlertDismissable
