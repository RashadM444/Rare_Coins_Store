import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
} from "./LoginTypes";

const initialState = {
  signedIn: false,
  loading: false,
  token: "",
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        loading: false,
        token: action.payload.token,
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
