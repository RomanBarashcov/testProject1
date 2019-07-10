import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const playerLiveTeam = (users) => {
  return {
    type: types.PLAYER_LIVE_TEAM,
    users
  };
};

export const liveFromTeam = (playerId, reason, teamId, isLive) => {

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
        playerId: playerId,
        reason: reason,
        teamId: teamId,
        isLive: isLive
    });

    return fetch(`${API_URL}/users/live-team`, fetchOptions)
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
        dispatch(playerLiveTeam(json.users));
      })
      .catch(e => cathcHandler(e));
  };
};

export default liveFromTeam;
