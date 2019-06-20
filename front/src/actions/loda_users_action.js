import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";

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
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingUsers());

    return fetch(`/users`, fetchOptions)
      .then(response => {
        if (response.status !== 200) {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        } else {
          return response.json();
        }
      })
      .then(json => {
        dispatch(usersLoaded(json));
      })
      .catch(e => {
        if (e.name === "TypeError" && e.message === "Failed to fetch") {
          console.error(e);
          throw e;
        }

        if (!e.response) {
          console.log("!error.response");
          console.error(e.stack);
        }

        console.log("error");
        console.log(e);

        throw e;
      });
  };
};

export default loadUsers;
