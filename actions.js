export const actionTypes = {
  FAILURE: 'FAILURE',
  LOAD_LOGIN: 'LOAD_LOGIN',
  LOAD_LOGIN_SUCCESS: 'LOAD_LOGIN_SUCCESS',
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  LOAD_ARTICLES_SUCCESS: 'LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLE: 'LOAD_ARTICLE',
  LOAD_ARTICLE_SUCCESS: 'LOAD_ARTICLE_SUCCESS',
  ADD_ARTICLE: 'ADD_ARTICLE',
  ADD_ARTICLE_SUCCESS: 'ADD_ARTICLE_SUCCESS',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  UPDATE_ARTICLE_SUCCESS: 'UPDATE_ARTICLE _SUCCESS',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  DELETE_ARTICLE_SUCCESS: 'DELETE_ARTICLE_SUCCESS',
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function loadLogin(email, password, next) {
  return {
    type: actionTypes.LOAD_LOGIN,
    email,
    password,
    next,
  };
}

export function loadLoginSuccess(loginData) {
  return {
    type: actionTypes.LOAD_LOGIN_SUCCESS,
    loginData,
  };
}

export function loadArticles(token) {
  return { type: actionTypes.LOAD_ARTICLES, token };
}

export function loadArticlesSuccess(data) {
  return {
    type: actionTypes.LOAD_ARTICLES_SUCCESS,
    data,
  };
}

export function loadArticle(id, token) {
  return {
    type: actionTypes.LOAD_ARTICLE,
    id,
    token,
  };
}

export function loadArticleSuccess(data) {
  return {
    type: actionTypes.LOAD_ARTICLE_SUCCESS,
    data,
  };
}

export function addArticle(title, content, token) {
  return {
    type: actionTypes.ADD_ARTICLE,
    title,
    content,
    token,
  };
}

export function addArticleSuccess() {
  return {
    type: actionTypes.ADD_ARTICLE_SUCCESS,
  };
}

export function updateArticle(title, content, id, token) {
  return {
    type: actionTypes.UPDATE_ARTICLE,
    title,
    content,
    id,
    token,
  };
}

export function updateArticleSuccess() {
  return {
    type: actionTypes.UPDATE_ARTICLE_SUCCESS,
  };
}


export function deteleArticle(id, token) {
  return {
    type: actionTypes.DELETE_ARTICLE,
    id,
    token,
  };
}

export function deleteArticleSuccess() {
  return {
    type: actionTypes.DELETE_ARTICLE_SUCCESS,
  };
}
