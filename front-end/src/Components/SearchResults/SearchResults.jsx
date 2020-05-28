import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SearchResults extends Component {
  state = {
    coins: [],
  };
  controller = new AbortController();

  fetchSearchCoins = (searchObj) => {
    fetch("http://localhost:3005/search", {
      signal: this.controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchObj }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ coins: res });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    const searchObj = this.props.location.state.searchObj;
    this.fetchSearchCoins(searchObj);
  };

  componentDidUpdate = (searchObj) => {
    searchObj = this.props.location.state.searchObj;

    this.fetchSearchCoins(searchObj);
  };

  componentWillUnmount() {
    this.controller.abort();
  }
  render() {
    let coins = this.state.coins;
    return (
      <div>
        <div className='list-menu'>
          {coins.map((coin) => {
            return (
              <div key={coin.id} className='coin-menu-item'>
                <img src={coin.obverse} alt={coin.name} />
                <div className='item-info'>
                  <NavLink
                    className='navlink'
                    to={{
                      pathname: "/coin",
                      state: {
                        id: `${coin.id}`,
                      },
                    }}
                  >
                    <h3>{coin.name}</h3>
                  </NavLink>
                  <p>{coin.shortInfo}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchResults;
