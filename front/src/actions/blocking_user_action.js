import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const userBlocked = (users) => {
  return {
    type: types.USER_BLOCKED,
    users
  };
};

export const blockingUser = (userId, reason, isBlock) => {

  return (dispatch) => {

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    fetchOptions.body = JSON.stringify({
        userId: userId,
        reason: reason,
        isBlock: isBlock
      });

    return fetch(`${API_URL}/api/users/block`, fetchOptions)
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
        dispatch(userBlocked(json.users));
      })
      .catch(e => cathcHandler(e));
  };
};

export default blockingUser;
