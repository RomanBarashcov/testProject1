import fetch from "isomorphic-fetch";
import { emailRegex } from "../constants/regex_validators";

import * as types from "../constants/action_types";

export const updateStatus = (status, field) => {
  return {
    type: types.UPDATE_STATUS,
    status,
    field
  };
};

export const setProfile = (profile) => {
  return {
    type: types.SET_PROFILE,
    profile
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    const fetchOptions = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    };

    if(!emailRegex.test(email)) {
      dispatch(updateStatus({status: 400, message: "Invalid Email"}, "EMAIL"));
      return Promise.resolve();
    }
    fetchOptions.body = JSON.stringify({
      email: email,
      password: password
    });

    return fetch(`/login`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          response.json()
            .then(res => {
              let error = new Error(res.message);
              error.response = res;
              throw error;
            })
            .catch(err => {
              if (response.status === 403) {
                dispatch(updateStatus(err, "EMAIL"));
              } else {
                dispatch(updateStatus(err, "PASSWORD"));
              }
            });
        } else {
          response.json()
            .then(data => {
              dispatch(setProfile(data));
              return window.location = "/";
            });
        }
      });
  };
};

export default signIn;