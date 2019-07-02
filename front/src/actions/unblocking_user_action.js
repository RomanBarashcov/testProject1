import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const userUnblocked = (users) => {
  return {
    type: types.USER_UNBLOCKED,
    users
  };
};

export const unblockingUser = (blokingUserId, reason) => {

  return (dispatch) => {

    const fetchOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    fetchOptions.body = JSON.stringify({
        blokingUserId: blokingUserId,
        reason: reason
      });

    return fetch(`${API_URL}/users/unblocking`, fetchOptions)
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
        dispatch(userUnblocked(json.users));
      })
      .catch(e => cathcHandler(e));
  };
};

export default unblockingUser;
