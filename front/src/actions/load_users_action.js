import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingUsers = () => {
  return {
    type: types.LOADING_USERS
  };
};

export const usersLoaded = (users) => {
  return {
    type: types.USERS_LOADED,
    users
  };
};

export const loadUsers = () => {

  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingUsers());

    return fetch(`${API_URL}/users`, fetchOptions)
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
        dispatch(usersLoaded(json.users));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadUsers;
