import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { fromJS } from 'immutable'
import api from 'api'
import * as actions from 'actions/tickets'
import * as dataActions from 'actions/data'
import * as sagas from 'sagas/tickets'

describe('tickets module sagas', () => {
  describe('GET: fetch tickets', () => {
    it('calls the api method', () => {
      const generator = sagas.fetchTickets()

      expect(generator.next().value).to.deep.eq(call(api.fetchTickets, {}))
    })

    it('fetches tickets', () => {
      const generator = sagas.fetchTickets()
      generator.next()
      const response = []
      const next = generator.next(response).value
      const expected = put(dataActions.fetchDataSuccess(response, 'ticket'))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.response).to.equal(expected.PUT.action.response)
    })

    it('returns an error if fetching fails', () => {
      const generator = sagas.fetchTickets()

      expect(generator.next().value).to.deep.eq(call(api.fetchTickets, {}))

      // fake response
      const error = { message: 'Error!' }

      expect(generator.throw(error).value).to.deep.eq(put(actions.fetchTicketsFailure(error)))
    })
  })

  describe('POST: create ticket', () => {
    const fixture = {
      summary: 'Ticket summary',
      description: 'Ticket description'
    }

    it('calls the api methods', () => {
      const generator = sagas.createTicket({ payload: fixture })

      expect(generator.next().value).to.deep.eq(call(api.createTicket, fixture))
    })

    it('creates a ticket', () => {
      const generator = sagas.createTicket({ payload: fixture })
      generator.next()
      const response = {
        id: 0,
        ...fixture
      }
      const next = generator.next(response).value
      const expected = put(actions.createTicketSuccess(response))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.response).to.equal(expected.PUT.action.response)
    })

    it('redirects to new ticket page', () => {
      const generator = sagas.createTicket({ payload: fixture })
      generator.next()
      const response = fromJS({
        id: 0,
        ...fixture
      })
      generator.next(response).value

      const next = generator.next().value
      const expected = put(push(`/teams/${response.id}`))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.response).to.equal(expected.PUT.action.response)
    })

    it('returns an error if creation fails', () => {
      const generator = sagas.createTicket({ payload: fixture })

      expect(generator.next().value).to.deep.eq(call(api.createTicket, fixture))

      const response = { message: 'Error!' }

      expect(generator.throw(response).value).to.deep.eq(put(actions.createTicketFailure(response)))
    })
  })

  describe('PUT: update ticket', () => {
    const fixture = {
      id: 0,
      summary: 'Ticket summary',
      description: 'Ticket description'
    }

    it('calls the api method', () => {
      const generator = sagas.updateTicket({ payload: fixture })

      expect(generator.next().value).to.deep.eq(call(api.updateTicket, fixture))
    })

    it('updates the ticket', () => {
      const generator = sagas.updateTicket({ payload: fromJS(fixture) })
      generator.next()
      const next = generator.next(true).value
      const expected = put(actions.updateTicketSuccess(fixture))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.response).to.equal(expected.PUT.action.response)
    })

    it('redirects to the given ticket', () => {
      const generator = sagas.updateTicket({ payload: fromJS(fixture) })
      generator.next()
      generator.next(true).value
      const next = generator.next().value
      const expected = put(push(`/tickets/${fixture.id}`))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.response).to.equal(expected.PUT.action.response)
    })

    it('generates an error is updating fails', () => {
      const generator = sagas.updateTicket({ payload: fixture })

      expect(generator.next().value).to.deep.eq(call(api.updateTicket, fixture))

      const response = { message: 'Error!' }

      expect(generator.throw(response).value).to.deep.eq(put(actions.updateTicketFailure(response)))
    })
  })

  describe('DELETE: delete ticket', () => {
    const fixture = {
      id: 0
    }

    it('calls the api method', () => {
      const generator = sagas.deleteTicket({ payload: fixture })

      expect(generator.next().value).to.deep.eq(call(api.deleteTicket, fixture))
    })

    it('deletes a ticket', () => {
      const generator = sagas.deleteTicket({ payload: fixture })
      generator.next()
      const response = fixture
      const next = generator.next(response).value
      const expected = put(actions.deleteTicketSuccess(response))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.id).to.equal(expected.PUT.action.id)
    })

    it('redirects to tickets index', () => {
      const generator = sagas.deleteTicket({ payload: fixture })
      generator.next()
      generator.next(fixture).value
      const next = generator.next().value
      const expected = put(push(`/tickets`))

      expect(next.PUT.action.type).to.equal(expected.PUT.action.type)
      expect(next.PUT.action.id).to.equal(expected.PUT.action.id)
    })

    it('returns an error if deleting fails', () => {
      const generator = sagas.deleteTicket({ payload: fixture })
      generator.next()
      const response = { message: 'Error!' }

      expect(generator.throw(response).value).to.deep.eq(put(actions.deleteTicketFailure(response)))
    })
  })
})
