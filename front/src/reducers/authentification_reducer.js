import * as types from "../constants/action_types";

const initState = {
  statusResponse: {
    status: null,
    field: ""
  },
  token: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_STATUS:
      return Object.assign({}, state, {
        statusResponse: {
          status: action.status,
          field: action.field
        }
      });
    case types.RESET_ERROR_STATUS: {
      return Object.assign({}, state, {
        statusResponse: {
          status: null,
          field: ""
        }
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
