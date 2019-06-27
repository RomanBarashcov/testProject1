import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

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
      method: "get"
    };

    dispatch(loadingUserInfo());

    return fetch(`${API_URL}/users/${id}`, fetchOptions)
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
        dispatch(userInfoLoaded(json.user));
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

export default loadUserInfo;
