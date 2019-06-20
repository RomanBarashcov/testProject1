import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  myProfile: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_MY_PROFILE:
      return Object.assign({}, state, {loading: true});
    case types.MY_PROFILE_DATA_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        myProfile: action.myProfile
      });
    default:
      return state;
  }
};