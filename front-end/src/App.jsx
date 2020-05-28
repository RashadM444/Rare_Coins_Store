import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Header from "./Components/Header/Header";
import CoinsMain from "./Components/Coins-homepage/CoinsMain";
import CoinList from "./Components/Coins-lists/CoinList";
import CoinItem from "./Components/CoinItem/CoinItem";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import EditCoin from "./Components/Edit/EditCoin";
import SearchResults from "./Components/SearchResults/SearchResults";
import AddCoin from "./Components/AddCoin/AddCoin";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={CoinsMain} />
            <Route path='/coins' component={CoinList} />
            <Route path='/coin' exact component={CoinItem} />
            <Route path='/admin/panel' component={AdminPanel} />
            <Route path='/admin' exact component={AdminLogin} />
            <Route path='/coin/edit/:id' exact component={EditCoin} />
            <Route path='/searchResults' component={SearchResults} />
            <Route path='/addCoin' component={AddCoin} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
