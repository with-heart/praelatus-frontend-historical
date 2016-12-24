import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTicketRequest } from 'actions/tickets'
import { TicketNew } from 'components/tickets'

class TicketNewContainer extends Component {
  handleSubmit(values) {
    this.props.createTicket(values)
  }

  render() {
    return <TicketNew onSubmit={::this.handleSubmit} {...this.props} />
  }
}

const mapStateToProps = () => ({})

TicketNewContainer = connect(
  mapStateToProps,
  { createTicket: createTicketRequest }
)(TicketNewContainer)

export default TicketNewContainer
