import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingMyProfile = () => {
  return {
    type: types.LOADING_MY_PROFILE
  };
};

export const setProfile = (profile) => {
  return {
    type: types.SET_PROFILE,
    profile
  };
};

export const loadCurrentUser = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingMyProfile());

    return fetch(`${API_URL}/api/users/current-user`, fetchOptions)
      .then(response => {
        if (response.status !== 200) {
          let error = new Error(response.message);
          error.response = response;
          throw error;
        } else {
          return response.json();
        }
      })
      .then(json => {
        dispatch(setProfile(json.user));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadCurrentUser;
