import {
  FETCH_COINLIST_REQUEST,
  FETCH_COINLIST_SUCCESS,
  FETCH_COINLIST_FAILURE,
} from "./CoinListTypes";

const initialState = {
  loading: false,
  coins: [],
  error: "",
};

const coinListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COINLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };
    case FETCH_COINLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coinListReducer;
