import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingNotificationTypes = () => {
  return {
    type: types.LOADING_NOTIFICATION_TYPES
  };
};

export const notificationTypesLoaded = (notificationTypes) => {
  return {
    type: types.NOTIFICATION_TYPES_LOADED,
    notificationTypes
  };
};

export const loadNotificationTypes = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingNotificationTypes());

    return fetch(`${API_URL}/notification-types`, fetchOptions)
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
        dispatch(notificationTypesLoaded(json.states));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadNotificationTypes;
