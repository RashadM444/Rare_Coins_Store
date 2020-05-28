import history from "../../History";
import {
  FETCH_ALLCOINS_REQUEST,
  FETCH_ALLCOINS_SUCCESS,
  FETCH_ALLCOINS_FAILURE,
} from "./AllCoinsTypes";

export const fetchAllCoinsRequest = () => {
  return {
    type: FETCH_ALLCOINS_REQUEST,
  };
};

export const fetchAllCoinsSuccess = (coins) => {
  return {
    type: FETCH_ALLCOINS_SUCCESS,
    payload: coins,
  };
};

export const fetchAllCoinsFailure = (error) => {
  return {
    type: FETCH_ALLCOINS_FAILURE,
    payload: error,
  };
};

export const fetchAllCoins = () => {
  return (dispatch) => {
    dispatch(fetchAllCoinsRequest);
    return fetch(`http://localhost:3005/allCoins`)
      .then((resp) => resp.json())
      .then((res) => {
        const allCoins = res;
        history.push("/admin/panel");
        dispatch(fetchAllCoinsSuccess(allCoins));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchAllCoinsFailure(errMsg));
      });
  };
};
