import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoin } from "../../Redux";
import "./style.css";

const CoinItem = (props) => {
  useEffect(() => {
    const { id } = props.location.state;
    props.dispatch(fetchCoin(id));
  }, []);
  const { coin } = props.coin;
  console.log(coin);
  return (
    <div>
      <section className='main-conatiner'>
        <div className='image-container'>
          <img src={`${coin.obverse}`} alt='obverse' />
          <img src={`${coin.reverse}`} alt='reverse' />
        </div>
        <div className='coin-info-container'>
          <h2>{coin.name}</h2>
          <p>{coin.longInfo}</p>
          <table>
            <tbody>
              <tr>
                <td>Issuing Country</td>
                <td>{coin.country}</td>
              </tr>
              <tr>
                <td>Composition</td>
                <td>{coin.metal}</td>
              </tr>
              <tr>
                <td>Quality</td>
                <td>{coin.quality}</td>
              </tr>
              <tr>
                <td>Denomination</td>
                <td>{coin.faceVal}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{coin.year}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{coin.weight}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{coin.price}</td>
              </tr>
            </tbody>
          </table>
          <button
            className='back-to-list-button'
            onClick={() => {
              props.history.goBack();
            }}
          >
            Back to the list
          </button>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    coin: state.coin,
  };
};
export default connect(mapStateToProps)(CoinItem);
