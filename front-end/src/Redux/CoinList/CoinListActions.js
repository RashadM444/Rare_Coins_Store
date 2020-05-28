import {
  FETCH_COINLIST_REQUEST,
  FETCH_COINLIST_SUCCESS,
  FETCH_COINLIST_FAILURE,
} from "./CoinListTypes";

export const fetchCoinListRequest = () => {
  return {
    type: FETCH_COINLIST_REQUEST,
  };
};

export const fetchCoinListSuccess = (coins) => {
  return {
    type: FETCH_COINLIST_SUCCESS,
    payload: coins,
  };
};

export const fetchCoinListFailure = (error) => {
  return {
    type: FETCH_COINLIST_FAILURE,
    payload: error,
  };
};

export const fetchCoinList = (type) => {
  return (dispatch) => {
    dispatch(fetchCoinListRequest);
    return fetch(`http://localhost:3005/coins?type=${type}`)
      .then((resp) => resp.json())
      .then((res) => {
        const coins = res;
        console.log(coins);
        dispatch(fetchCoinListSuccess(coins));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchCoinListFailure(errMsg));
      });
  };
};
