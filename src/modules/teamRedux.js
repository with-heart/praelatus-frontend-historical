import { createReducer, createActions } from 'reduxsauce'
import { mergeWith } from 'ramda'
import Immutable from 'seamless-immutable'
import deepMerge from 'util-deep-merge'

/* TYPES AND ACTION CREATORS */

const { Types: types, Creators: creators } = createActions({
  fetchRequest: ['payload'],
  fetchFailure: ['error'],
  createRequest: ['payload'],
  createSuccess: ['team'],
  createFailure: ['error'],
  updateRequest: ['payload'],
  updateSuccess: ['team'],
  updateFailure: ['error'],
  deleteRequest: ['name'],
  deleteSuccess: ['name'],
  deleteFailure: ['error'],
});

export const teamTypes = types
export default creators

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  byName: {},
  names: [],
  error: null,
  fetching: false,
})

/* REDUCERS */

export const request = state =>
  state.merge({
    fetching: true,
    error: null,
  })

export const success = (state, { team }) =>
  mergeWith(deepMerge, state, {
    fetching: false,
    error: null,
    names: [team.name],
    byName: { [team.name]: team }
  })

export const failure = (state, { error }) => state.merge({ fetching: false, error })

export const remove = (state, { name }) => state.merge({
  fetching: false,
  error: null,
  names: state.names.filter(n => n !== name),
  byName: state.byName.without(name)
})


/* HOOKUP REDUCERS TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [types.FETCH_REQUEST]: request,
  [types.FETCH_FAILURE]: failure,

  [types.CREATE_REQUEST]: request,
  [types.CREATE_SUCCESS]: success,
  [types.CREATE_FAILURE]: failure,

  [types.UPDATE_REQUEST]: request,
  [types.UPDATE_SUCCESS]: success,
  [types.UPDATE_FAILURE]: failure,

  [types.DELETE_REQUEST]: request,
  [types.DELETE_SUCCESS]: remove,
  [types.DELETE_FAILURE]: failure,
})

/* SELECTORS */

export const team = (state, name) => state.byName[name]

export const teams = (state, names) => {
  let teamNames = state.names

  if (names) {
    teamNames = teamNames.filter(n => names.includes(n))
  }

  return teamNames.map(n => team(state, n))
}

export const fetching = state => state.fetching

export const error = state => state.error
