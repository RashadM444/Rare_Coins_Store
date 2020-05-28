import {
  FETCH_COIN_REQUEST,
  FETCH_COIN_SUCCESS,
  FETCH_COIN_FAILURE,
} from "./CoinItemTypes";

const initialState = {
  loading: false,
  coin: {},
  error: "",
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        coin: action.payload,
      };
    case FETCH_COIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coinReducer;
