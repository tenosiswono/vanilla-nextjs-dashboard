import { actionTypes } from './actions';

export const exampleInitialState = {
  error: false,
  email: '',
  password: '',
  loginData: '',
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case actionTypes.LOAD_LOGIN:
      return {
        ...state,
        ...{ email: action.email },
        ...{ password: action.password },
      };

    case actionTypes.LOAD_LOGIN_SUCCESS:
      return {
        ...state,
        ...{ loginData: action.loginData },
      };

    default:
      return state;
  }
}

export default reducer;
