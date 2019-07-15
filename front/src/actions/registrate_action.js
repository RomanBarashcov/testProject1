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

export const registrate = (name, email, password, confirmPassword, selectedTeam) => {
  return (dispatch) => {
    const fetchOptions = {
      method: "POST",
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

    if(password !== confirmPassword) {
      dispatch(updateStatus("Confirm password is incorrect!"));
      return Promise.resolve();
    }
    
    fetchOptions.body = JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        teamId: selectedTeam
    });

    return fetch(`${API_URL}/registration`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          response.json()
            .then(res => {
              dispatch(updateStatus(res.message));
            });
        } else {
          response.json()
            .then(data => {
              return window.location = "/";
            });
        }
      });
  };
};

export default registrate;
