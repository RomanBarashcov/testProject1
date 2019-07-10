import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  user: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_USER_INFO:
      return Object.assign({}, state, {loading: true});
    case types.USER_INFO_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        user: action.user
      });
    case types.USER_TEAM_UPDATING:
        return Object.assign({}, state, {
          loading: false,
          loaded: true,
          user: action.user
        });
    case types.USER_BLOCKED: 
        return Object.assign({}, state, {
          loading: false,
          loaded: true,
          user: action.user
        });
    case types.UNBLOCKED_USER:
        return Object.assign({}, state, {
          loading: false,
          loaded: true,
          user: action.user
        });
    case types.USER_TEAM_UPDATED:
        return Object.assign({}, state, {
          loading: false,
          loaded: true,
          user: action.user
        });
    default:
      return state;
  }
};