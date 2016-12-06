/** @module projects/types */

/**
 * Constants that represent the types of actions that are dispatched by project
 * actions. 
 */
export default {
  FETCH_PROJECTS_FAILURE: 'PROJECTS/FETCH_FAILURE',
  FETCH_PROJECTS_REQUEST: 'PROJECTS/FETCH_REQUEST',

  CREATE_PROJECT_REQUEST: 'PROJECTS/CREATE_REQUEST',
  CREATE_PROJECT_SUCCESS: 'PROJECTS/CREATE_SUCCESS',
  CREATE_PROJECT_FAILURE: 'PROJECTS/CREATE_FAILURE',

  UPDATE_PROJECT_REQUEST: 'PROJECTS/UPDATE_REQUEST',
  UPDATE_PROJECT_SUCCESS: 'PROJECTS/UPDATE_SUCCESS',
  UPDATE_PROJECT_FAILURE: 'PROJECTS/UPDATE_FAILURE',

  DELETE_PROJECT_REQUEST: 'PROJECTS/DELETE_REQUEST',
  DELETE_PROJECT_SUCCESS: 'PROJECTS/DELETE_SUCCESS',
  DELETE_PROJECT_FAILURE: 'PROJECTS/DELETE_FAILURE',
}
