import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingStates = () => {
  return {
    type: types.LOADING_STATES
  };
};

export const statesLoaded = (states) => {
  return {
    type: types.STATES_LOADED,
    states
  };
};

export const loadStates = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingStates());

    return fetch(`${API_URL}/states`, fetchOptions)
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
        dispatch(statesLoaded(json.states));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadStates;
