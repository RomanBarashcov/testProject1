import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingUserInfo = () => {
  return {
    type: types.LOADING_USER_INFO
  };
};

export const userInfoLoaded = (user) => {
  return {
    type: types.USER_INFO_LOADED,
    user
  };
};

export const loadUserInfo = (id) => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingUserInfo());

    return fetch(`${API_URL}/api/users/${id}`, fetchOptions)
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
        dispatch(userInfoLoaded(json.user));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadUserInfo;
