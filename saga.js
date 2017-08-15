/* global fetch */

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import request from './utils/request';
import BASE_URL from './utils/baseUrl';

import { actionTypes, failure, loadLoginSuccess } from './actions';

import Cookie from 'js-cookie';
import Router from 'next/router';

function* loadLogin({ email, password, next }) {
  const requestURL = `${BASE_URL}/api/auth/signin`;
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    yield put(loadLoginSuccess(res));
    // Store the token for the benefit of client and server
    window.localStorage.setItem('session', JSON.stringify(res));
    Cookie.set('token', res.token, { secure: false });
    Router.push(next || '/');
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_LOGIN, loadLogin),
  ]);
}

export default rootSaga;
