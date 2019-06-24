import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

export const loadingTeamInfo = () => {
  return {
    type: types.LOADING_TEAM_INFO
  };
};

export const teamInfoLoaded = (team) => {
  return {
    type: types.TEAM_INFO_LOADED,
    team
  };
};

export const loadTeamInfo = (id) => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get"
    };

    dispatch(loadingTeamInfo());

    return fetch(`${API_URL}/teams/${id}`, fetchOptions)
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
          console.log("json___", json);
        dispatch(teamInfoLoaded(json));
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

export default loadTeamInfo;
