import { actionTypes } from './actions';

export const exampleInitialState = {
  error: false,
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    default:
      return state;
  }
}

export default reducer;
