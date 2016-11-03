/** @module projects/reducers */

import { Map, List } from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import { types } from 'modules/projects'

/**
 * Reducer that manages a Map of all projects in the state. The key is the
 * project's stringified id, and the value is a Map that represents all fields of
 * the project.
 *
 * If byId is passed an action that has a response attribute, byId will merge
 * that current state with the response's projects entities and return it.
 *
 * Returns the state param if passed no action or an action without a response
 * attribute.
 *
 * @param {Map} [state=Map] - The byId portion of the project state.
 * @param {object} action - The action that determines how byId will deal with
 * its return.
 * @return {Map}
 */
const byId = (state = Map(), action) => {
  if (action.response) {
    return state.merge(action.response.entities.projects)
  }

  return state
}

/**
 * Reducer that manages a List of all project ids in the state. 
 *
 * When projects are fetched successfully from the server, the reducer will
 * replace its state with the new list of ids.
 *
 * @param {List} [state=List] - The ids portion of the projects state.
 * @param {object} action - The action that determines how ids handles its state
 * return.
 * @return {List}
 */
const ids = (state = List(), action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return List(action.response.result)
    default:
      return state
  }
}

/**
 * Reducer that manages the error message for the projects portion of the state.
 *
 * If an action with a type of FETCH_projectS_FAILURE is passed, the state is
 * updated to the action's message. If the type is FETCH_projectS_SUCCESS or
 * FETCH_projectS_REQUEST, we update the state to null as we no longer need the
 * previous error message. Otherwise, we return the previous error message.
 *
 * @param {string|null} [state=null] - The error message portion of the projects
 * state.
 * @param {object} action - The action that determines how error handles its 
 * state return.
 * @return {string|null}
 */
const error = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_FAILURE:
      return action.message
    case types.FETCH_PROJECTS_SUCCESS:
    case types.FETCH_PROJECTS_REQUEST:
      return null
    default:
      return state
  }
}

/**
 * Reducer that manages the loading state for the projects portion of the state.
 *
 * If an action with a type of FETCH_projectS_REQUEST is passed, the state is
 * updated to true as projects are being loaded. If an action with type
 * FETCH_projectS_SUCCESS or FETCH_projectS_FAILURE is passed, state is set to
 * false as we are no longer loading any projects. Otherwise we return the
 * current state.
 *
 * @param {boolean} [state=false] - The loading state portion of the projects
 * state.
 * @params {object} action - The action that determines how loading handles its
 * state return.
 * @return {boolean}
 */
const loading = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_REQUEST:
      return true
    case types.FETCH_PROJECTS_SUCCESS:
    case types.FETCH_PROJECTS_FAILURE:
      return false
    default:
      return state
  }
}

/**
 * Combines all of the reducers into a single reducer structure. The state is
 * handled as a Map, with each key representing that piece of the project state.
 *
 * The projects state structure ends up looking like the following:
 * 
 * Map {
 *   byId:Map,
 *   ids:List,
 *   error:string?,
 *   loading:boolean 
 * }
 *
 * When an action is passed to the projects reducer, each reducer is called with
 * its piece of the combined state as well as the action. The returned value
 * from each reducer represents the new state value for that portion of the
 * state.
 *
 * @returns {function} - The combined reducers.
 */
const reducer = combineReducers({
  byId,
  ids,
  error,
  loading,
})
export default reducer

