import { actionTypes } from './actions';

export const exampleInitialState = {
  error: false,
  email: '',
  password: '',
  loginData: '',
  articles: null,
  article: null,
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
        ...{ error: false },
      };

    case actionTypes.LOAD_ARTICLES:
      return {
        ...state,
        ...{ articles: null },
      };

    case actionTypes.LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        ...{ articles: action.data },
        ...{ error: false },
      };

    case actionTypes.LOAD_ARTICLE:
      return {
        ...state,
        ...{ article: null },
      };

    case actionTypes.LOAD_ARTICLE_SUCCESS:
      return {
        ...state,
        ...{ article: action.data },
        ...{ error: false },
      };

    case actionTypes.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        ...{ error: false },
      };

    case actionTypes.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...{ error: false },
      };

    case actionTypes.DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...{ error: false },
      };

    default:
      return state;
  }
}

export default reducer;
