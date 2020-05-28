import React from "react";
import { NavLink } from "react-router-dom";
import "./coinsMainStyle.css";

export default class CoinHeader extends React.Component {
  render() {
    return (
      <div className='coin-item'>
        <h2>{this.props.header}</h2>
        <NavLink className='show-all-button' to={this.props.to}>
          Show all <i className='fas fa-chevron-right'></i>
        </NavLink>
        <img className='header-coin' src={this.props.img} alt='coin logo' />
      </div>
    );
  }
}
