import fetch from "isomorphic-fetch";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";
import cathcHandler from '../handlers/catch_handler';

export const loadingRoles = () => {
  return {
    type: types.LOADING_ROLES
  };
};

export const rolesLoaded = (roles) => {
  return {
    type: types.ROLES_LOADED,
    roles
  };
};

export const loadRoles = () => {
  return (dispatch) => {

    const fetchOptions = {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    dispatch(loadingRoles());

    return fetch(`${API_URL}/api/roles`, fetchOptions)
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
        dispatch(rolesLoaded(json.roles));
      })
      .catch(e => cathcHandler(e));
  };
};

export default loadRoles;
