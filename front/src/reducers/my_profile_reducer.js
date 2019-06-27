import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  myProfile: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_MY_PROFILE:
      return Object.assign({}, state, {loading: true});
    case types.SET_PROFILE:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        myProfile: action.profile
      });
    default:
      return state;
  }
};