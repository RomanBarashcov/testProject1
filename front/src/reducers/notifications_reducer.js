import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  list: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_NOTIFICATIONS:
      return Object.assign({}, state, {loading: true});
    case types.NOTIFICATIONS_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        list: action.notifications
      });
    default:
      return state;
  }
};