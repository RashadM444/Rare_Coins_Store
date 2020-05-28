import React, { Component } from "react";
import Input from "../Input/Input";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import randomString from "../../Helper/RandomStringGenerator";
import "./style.css";

class Searchbar extends Component {
  state = {
    filter: false,
    countries: [],
    metals: [],
    qualities: [],
    country: "",
    metal: "",
    quality: "",
    search: "",
    fromPrice: 0,
    toPrice: 0,
    fromYear: 0,
    toYear: 0,
  };

  componentDidMount() {
    fetch(`http://localhost:3005/coin/options/country`)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ countries: res });
      });
    fetch(`http://localhost:3005/coin/options/metal`)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ metals: res });
      });
    fetch(`http://localhost:3005/coin/options/quality`)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ qualities: res });
      });
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  toggleFilter = () => {
    this.setState({
      filter: !this.state.filter,
    });
  };

  render() {
    const searchObj = {
      search: this.state.search,
      country: this.state.country,
      metal: this.state.metal,
      quality: this.state.quality,
      fromPrice: this.state.fromPrice,
      toPrice: this.state.toPrice,
      fromYear: this.state.fromYear,
      toYear: this.state.toYear,
    };
    return (
      <div>
        <div className='simple-search-container'>
          <div className='simple-input-container'>
            <label htmlFor='search'>Input field</label>
            <Input
              id='search'
              handle={this.handleInput}
              value={this.state.search}
              height='46'
            />
          </div>
          <NavLink
            to={{
              pathname: "/searchResults",
              state: {
                searchObj,
              },
            }}
          >
            <button
              onClick={() => this.setState({ filter: false })}
              className='violet-button'
            >
              Search
            </button>
          </NavLink>
        </div>
        <div>
          {!this.state.filter ? (
            <button
              className='advanced-filter-button'
              onClick={this.toggleFilter}
            >
              Advanced Filter <i className='fas fa-chevron-down'></i>
            </button>
          ) : (
            <div>
              <button
                className='advanced-filter-button'
                onClick={this.toggleFilter}
              >
                Advanced Filter <i className='fas fa-chevron-up'></i>
              </button>
              <div className='main-filter-container'>
                <div className='first-filter-container'>
                  <label htmlFor='country'>Issuing country</label>
                  <select
                    value={this.state.country}
                    onChange={this.handleInput}
                    className='filter-select'
                    name='country'
                    id='country'
                  >
                    {this.state.countries.map((country) => {
                      return (
                        <option key={randomString(100)}>
                          {country.country}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor='metal'>Metal</label>
                  <select
                    value={this.state.metal}
                    onChange={this.handleInput}
                    className='filter-select'
                    name='metal'
                    id='metal'
                  >
                    {this.state.metals.map((metal) => {
                      return (
                        <option key={randomString(100)}>{metal.metal}</option>
                      );
                    })}
                  </select>
                  <label htmlFor='quality'>Quality</label>
                  <select
                    value={this.state.quality}
                    onChange={this.handleInput}
                    className='filter-select'
                    name='quality'
                    id='quality'
                  >
                    {this.state.qualities.map((quality) => {
                      return (
                        <option key={randomString(100)}>
                          {quality.quality}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='second-filter-container'>
                  <div>
                    <div className='price-year-selection'>
                      <label htmlFor='price'>Price</label>
                      <div className='from-to-input'>
                        <label htmlFor='from'>from</label>
                        <input
                          value={this.state.fromPrice}
                          onChange={this.handleInput}
                          className='range-input'
                          type='number'
                          id='fromPrice'
                        />
                        <label htmlFor='to'>to</label>
                        <input
                          value={this.state.toPrice}
                          onChange={this.handleInput}
                          className='range-input'
                          type='number'
                          id='toPrice'
                        />
                      </div>
                    </div>
                    <div className='price-year-selection'>
                      <label htmlFor='year'>Year of Issue</label>
                      <div className='from-to-input'>
                        <label htmlFor='from'>from</label>
                        <input
                          value={this.state.fromYear}
                          onChange={this.handleInput}
                          className='range-input'
                          type='number'
                          id='fromYear'
                        />
                        <label htmlFor='to'>to</label>
                        <input
                          value={this.state.toYear}
                          onChange={this.handleInput}
                          className='range-input'
                          type='number'
                          id='toYear'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCoins: state.allCoins.allCoins,
    loading: state.allCoins.loading,
  };
};

export default connect(mapStateToProps)(Searchbar);
