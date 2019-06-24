import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

export const loadingNotifications = () => {
  return {
    type: types.LOADING_NOTIFICATIONS
  };
};

export const notificationsLoaded = (notifications) => {
  return {
    type: types.NOTIFICATIONS_LOADED,
    notifications
  };
};

export const loadNotifications = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingNotifications());

    return fetch(`${API_URL}/notifications`, fetchOptions)
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
        dispatch(notificationsLoaded(json));
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

export default loadNotifications;
