import {
  FETCH_ALLCOINS_REQUEST,
  FETCH_ALLCOINS_SUCCESS,
  FETCH_ALLCOINS_FAILURE,
} from "./AllCoinsTypes";

const initialState = {
  loading: false,
  allCoins: [],
  error: "",
};

const allCoinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLCOINS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALLCOINS_SUCCESS:
      return {
        ...state,
        loading: false,
        allCoins: action.payload,
      };
    case FETCH_ALLCOINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allCoinsReducer;
