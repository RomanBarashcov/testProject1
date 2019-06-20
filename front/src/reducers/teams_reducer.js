import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  list: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.TEAMS_LOADED:
      return Object.assign({}, state, {loading: true});
    case types.TEAMS_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        list: action.teams
      });
    default:
      return state;
  }
};