import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

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
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingTeamInfo());

    return fetch(`${API_URL}/api/teams/${id}`, fetchOptions)
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
        dispatch(teamInfoLoaded(json.team));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadTeamInfo;
