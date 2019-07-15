import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const userUpdating = () => {
  return {
    type: types.USER_UPDATING
  };
};

export const userUpdated = (user) => {
  return {
    type: types.USER_UPDATED,
    user
  };
};

export const userUpdate = (userId, teamId, roleId) => {

    return (dispatch) => {
  
      const fetchOptions = {
        method: "put",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      };

      fetchOptions.body = JSON.stringify({
        userId: userId,
        teamId: teamId,
        roleId: roleId
      });

      dispatch(userUpdating());
  
      return fetch(`${API_URL}/users/update-user`, fetchOptions)
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
          dispatch(userUpdated(json.user));
        })
        .catch(e => cathcHandler(e));
    };
  };
  
  export default userUpdate;
