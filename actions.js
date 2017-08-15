export const actionTypes = {
  FAILURE: 'FAILURE',
  LOAD_LOGIN: 'LOAD_LOGIN',
  LOAD_LOGIN_SUCCESS: 'LOAD_LOGIN_SUCCESS',
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