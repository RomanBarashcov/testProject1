import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

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
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingTeams());

    return fetch(`${API_URL}/teams`, fetchOptions)
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
        dispatch(teamsLoaded(json.teams));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadTeams;
