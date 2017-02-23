import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import actions from 'modules/auth'

export function * login(api, payload) {
  try {
    const response = yield call(api.login, payload)
    yield put(actions.loginSuccess(payload.username))
    yield put(push('/'))
  } catch (e) {
    yield put(actions.loginFailure(e))
  }
}

export function * register(api, { payload }) {
  try {
    const response = yield call(api.register, payload)
    yield put(actions.registerSuccess(payload.username))
    yield put(push('/'))
  } catch (e) {
    yield put(actions.registerFailure(e))
  }
}

export function * logout() {
  try {
    yield put(actions.logout())
    yield put(push('/'))
  } catch (e) {
  }
}
