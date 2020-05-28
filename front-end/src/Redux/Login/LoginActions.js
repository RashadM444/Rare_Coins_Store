import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
} from "./LoginTypes";

import history from "../../History";

export const postLoginRequest = () => {
  return {
    type: POST_LOGIN_REQUEST,
  };
};

export const postLoginSuccess = (token) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: token,
  };
};

export const postLoginFailure = (error) => {
  return {
    type: POST_LOGIN_FAILURE,
    payload: error,
  };
};

export const loginUser = (username, pass) => {
  return (dispatch) => {
    dispatch(postLoginRequest);
    return fetch("http://localhost:3005/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: username, pass: pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);

        dispatch(postLoginSuccess(data));
        // history.push("/admin/panel");
      })
      .catch((err) => {
        dispatch(postLoginFailure(err.message));
      });
  };
};
