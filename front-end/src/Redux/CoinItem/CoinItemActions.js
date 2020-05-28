import {
  FETCH_COIN_REQUEST,
  FETCH_COIN_SUCCESS,
  FETCH_COIN_FAILURE,
} from "./CoinItemTypes";

export const fetchCoinRequest = () => {
  return {
    type: FETCH_COIN_REQUEST,
  };
};

export const fetchCoinSuccess = (coins) => {
  return {
    type: FETCH_COIN_SUCCESS,
    payload: coins,
  };
};

export const fetchCoinFailure = (error) => {
  return {
    type: FETCH_COIN_FAILURE,
    payload: error,
  };
};

export const fetchCoin = (id) => {
  return (dispatch) => {
    dispatch(fetchCoinRequest);
    return fetch(`http://localhost:3005/coin/${id}`)
      .then((resp) => resp.json())
      .then((res) => {
        const coins = res;
        dispatch(fetchCoinSuccess(coins));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchCoinFailure(errMsg));
      });
  };
};
