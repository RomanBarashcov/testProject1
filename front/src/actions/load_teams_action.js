import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

export const loadingTeams = () => {
  return {
    type: types.LOADING_TEAMS
  };
};

export const teamsLoaded = (teams) => {
  return {
    type: types.TEAMS_LOADED,
    teams
  };
};

export const loadTeams = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get"
    };

    dispatch(loadingTeams());

    return fetch(`${API_URL}/teams`, fetchOptions)
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
        dispatch(teamsLoaded(json.teams));
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

export default loadTeams;
