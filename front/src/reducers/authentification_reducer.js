import * as types from "../constants/action_types";

const initState = {
    status: null,
    field: "",
    showError: false,
    token: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_STATUS:
      return Object.assign({}, state, {

          status: action.status,
          field: action.field,
          showError: true

      });
    case types.RESET_ERROR_STATUS: {
      return Object.assign({}, state, {
        
          status: null,
          field: "",
          showError: false

      });
    }
    case types.GET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });
    default:
      return state;
  }
};
