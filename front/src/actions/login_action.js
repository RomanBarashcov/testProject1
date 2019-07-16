import fetch from "isomorphic-fetch";
import { emailRegex } from "../constants/regex_validator";
import * as types from "../constants/action_types";
import API_URL from "../constants/hosts";

export const updateStatus = (message) => {
  return {
    type: types.UPDATE_STATUS,
    message
  };
};

export const setProfile = (profile) => {
  return {
    type: types.SET_PROFILE,
    profile
  };
};

export const logIn = (email, password) => {
  return (dispatch) => {
    const fetchOptions = {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    if(!emailRegex.test(email)) {
      dispatch(updateStatus("Invalid Email"));
      return Promise.resolve();
    }
    
    fetchOptions.body = JSON.stringify({
      email: email,
      password: password
    });

    return fetch(`${API_URL}/api/authentication`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          response.json()
            .then(res => {
              dispatch(updateStatus(res.message));
            });
        } else {
          response.json()
            .then(data => {
              dispatch(setProfile(data.currentUser));
              return window.location = "/";
            });
        }
      });
  };
};

export default logIn;
