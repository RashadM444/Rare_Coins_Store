import { combineReducers } from "redux";
import coinListReducer from "./CoinList/CoinListReducer";
import coinReducer from "./CoinItem/CoinItemReducer";
import loginReducer from "./Login/LoginReducer";
import allCoinsReducer from "./AllCoins/AllCoinsReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  coinList: coinListReducer,
  coin: coinReducer,
  token: loginReducer,
  allCoins: allCoinsReducer,
  form: formReducer,
});

export default rootReducer;
