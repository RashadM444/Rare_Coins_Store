import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import Searchbar from "../Searchbar/Searchbar";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className='header'>
          <NavLink className='logo' to='/'>
            <img
              className='logo-img'
              src='https://i.postimg.cc/rpGnxGGM/logo.png'
              alt='logo'
            />
          </NavLink>
          <NavLink className='admin-panel-button' to='/admin'>
            Admin Panel
          </NavLink>
        </div>
        <Searchbar />
      </div>
    );
  }
}
