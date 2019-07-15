import * as types from "../constants/action_types";

const initState = {
    message: null,
    showError: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_STATUS:
      return Object.assign({}, state, {

          message: action.message,
          showError: true

      });
    case types.RESET_ERROR_STATUS: {
      return Object.assign({}, state, {
        
          message: null,
          showError: false

      });
    }
    default:
      return state;
  }
};
