import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./style.css";
import { fetchCoinList } from "../../Redux/CoinList/CoinListActions";

const CoinList = (props) => {
  const [type, setType] = useState();
  useEffect(() => {
    const { type } = props.location.state;
    props.dispatch(fetchCoinList(type));
    setType(type);
  }, []);
  const { coins } = props;

  return (
    <div>
      <h2>{type} Coins</h2>
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
};

const mapStateToProps = (state) => {
  return {
    coins: state.coinList.coins,
    loading: state.coinList,
  };
};

export default connect(mapStateToProps)(CoinList);
