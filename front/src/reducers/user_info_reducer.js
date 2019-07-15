import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  user: {},
  error: false,
  message: ""
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_USER_INFO:
      return Object.assign({}, state, {loading: true,  message: ""});
    case types.USER_INFO_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        user: action.user
      });
    case types.USER_TEAM_UPDATING:
        return Object.assign({}, state, {
          loading: true,
          loaded: false,
        });
    case types.USER_BLOCKED: 
        return Object.assign({}, state, {
          user: action.user
        });
    case types.UNBLOCKED_USER:
        return Object.assign({}, state, {
          user: action.user
        });
    case types.USER_UPDATED:
        return Object.assign({}, state, {
          user: action.user,
          error: false,
          message: "Success: User updated!"
        });
    default:
      return state;
  }
};