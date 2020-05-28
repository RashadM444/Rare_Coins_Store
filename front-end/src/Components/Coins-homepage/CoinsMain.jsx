import React from "react";
import CoinHeader from "./CoinHeader";
import "./coinsMainStyle.css";

export default class CoinsMain extends React.Component {
  render() {
    return (
      <section className='main-menu'>
        <CoinHeader
          header='Bullion Coins'
          img='https://i.postimg.cc/mkdPNp9f/South-Vietnamese-Dong-1.png'
          to={{
            pathname: "/coins",
            state: {
              type: "Investment",
            },
          }}
        />
        <CoinHeader
          header='Exclusive Coins'
          img='https://i.postimg.cc/QdzprCHG/ISK-2.png'
          to={{
            pathname: "/coins",
            state: {
              type: "Exclusive",
            },
          }}
        />
        <CoinHeader
          header='Commemorative Coins'
          img='https://i.postimg.cc/J44JDZXC/Looney-1.png'
          to={{
            pathname: "/coins",
            state: {
              type: "Memorable",
            },
          }}
        />
      </section>
    );
  }
}
