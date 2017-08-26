/* global fetch */

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import Router from 'next/router';

import request from './utils/request';
import BASE_URL from './utils/baseUrl';

import { actionTypes, failure, loadLoginSuccess, loadArticlesSuccess, loadArticleSuccess, addArticleSuccess, deleteArticleSuccess } from './actions';

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
    const res = yield err.response.json();
    console.log(res)
    yield put(failure(res.message));
  }
}

function* loadArticles({ token }) {
  const requestURL = `${BASE_URL}/api/articles`;

  try {
    const data = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    yield put(loadArticlesSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* loadArticle({ id, token }) {
  const requestURL = `${BASE_URL}/api/articles/${id}`;

  try {
    const data = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    yield put(loadArticleSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* addArticle({ title, content, token }) {
  const requestURL = `${BASE_URL}/api/articles`;
  const body = JSON.stringify({
    title,
    content,
  });

  try {
    const data = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body,
    });
    yield put(addArticleSuccess(data));
    Router.push('/articles');
  } catch (err) {
    yield put(failure(err));
  }
}

function* updateArticle({ title, content, id, token }) {
  const requestURL = `${BASE_URL}/api/articles/${id}`;
  const body = JSON.stringify({
    _id: id,
    title,
    content,
    meta: {},
  });

  try {
    const data = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body,
    });
    yield put(loadArticleSuccess(data));
    Router.push('/articles');
  } catch (err) {
    yield put(failure(err));
  }
}


function* deleteArticle({ id, token }) {
  const requestURL = `${BASE_URL}/api/articles/${id}`;

  try {
    const data = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    yield put(deleteArticleSuccess(data));
    Router.push('/articles');
  } catch (err) {
    yield put(failure(err));
  }
}
function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_LOGIN, loadLogin),
    takeLatest(actionTypes.LOAD_ARTICLES, loadArticles),
    takeEvery(actionTypes.LOAD_ARTICLE, loadArticle),
    takeLatest(actionTypes.ADD_ARTICLE, addArticle),
    takeEvery(actionTypes.UPDATE_ARTICLE, updateArticle),
    takeEvery(actionTypes.DELETE_ARTICLE, deleteArticle),
  ]);
}

export default rootSaga;
