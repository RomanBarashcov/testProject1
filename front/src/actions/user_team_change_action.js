import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

export const userTeamUpdating = () => {
  return {
    type: types.USER_TEAM_UPDATING
  };
};

export const userTeamUpdated = (user) => {
  return {
    type: types.USER_TEAM_UPDATED,
    user
  };
};

export const userTeamChange = (userId, teamId) => {

    return (dispatch) => {
  
      const fetchOptions = {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      };

      fetchOptions.body = JSON.stringify({
        userId: userId,
        teamId: teamId
      });
  
      dispatch(userTeamUpdating());
  
      return fetch(`${API_URL}/users/team-change`, fetchOptions)
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
          dispatch(userTeamUpdated(json));
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
  
  export default userTeamChange;
