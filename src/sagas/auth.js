import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import types from 'types/auth'
import * as actions from 'actions/auth'
import api from 'api'

export function* loginFlow(action = {}) {
  try {
    const payload = action.payload || {}
    const response = yield call(api.login, payload)
    yield put(actions.loginSuccess(response))
    yield put(push('/'))
  } catch (e) {
    yield put(actions.loginFailure(e))
  }
}

export function* registerFlow(action = {}) {
  try {
    const payload = action.payload || {}
    const response = yield call(api.register, payload)
    yield put(actions.registerSuccess(response))
    yield put(push('/'))
  } catch (e) {
    yield put(actions.registerFailure(e))
  }
}

export function* logoutFlow() {
  try {
    yield put(actions.logoutSuccess())
    yield put(push('/'))
  } catch (e) {
    // TODO: Add logout failure action?
  }
}

export default function* watcher() {
  yield [
    takeLatest(types.LOGIN_REQUEST, loginFlow),
    takeEvery(types.LOGOUT_REQUEST, logoutFlow),
    takeLatest(types.REGISTER_REQUEST, registerFlow),
  ]
}