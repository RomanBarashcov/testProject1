import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  team: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_TEAM_INFO:
      return Object.assign({}, state, {loading: true});
    case types.TEAM_INFO_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        team: action.team
      });
    default:
      return state;
  }
};