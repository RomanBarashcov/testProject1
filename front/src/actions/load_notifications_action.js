import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

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
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingNotifications());

    return fetch(`${API_URL}/notifications`, fetchOptions)
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
        dispatch(notificationsLoaded(json.notifications));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadNotifications;
