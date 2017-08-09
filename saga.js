/* global fetch */

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import request from './utils/request';
import BASE_URL from './utils/baseUrl';

import { actionTypes, failure } from './actions';


function* rootSaga() {
  yield all([
  ]);
}

export default rootSaga;
