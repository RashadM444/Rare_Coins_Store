import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllCoins } from "../../Redux";
import { NavLink } from "react-router-dom";

import "./style.css";

class AdminPanel extends Component {
  state = {
    deleteClicked: false,
  };
  componentDidMount() {
    this.props.dispatch(fetchAllCoins());
  }
  toggleWindow = (e) => {
    this.setState({
      deleteClicked: !this.state.deleteClicked,
      id: e.target.id,
    });
  };

  toggleWindowBack = () => {
    this.setState({
      deleteClicked: false,
    });
  };

  handleDelete = () => {
    fetch(`http://localhost:3005/deleteCoin/${this.state.id}`, {
      method: "DELETE",
    })
      .then((res) => console.log(res))
      .then(() => {
        this.toggleWindowBack();
        this.props.dispatch(fetchAllCoins());
      });
  };

  render() {
    if (this.props.allCoins.length === 0) {
      return <div>LOADING</div>;
    } else {
      return (
        <div className='all-list-menu'>
          <div className='new-coin'>
            <NavLink className='navlink' to={{ pathname: "/addCoin" }}>
              <div className='for-image'>
                <p>+</p>
              </div>
            </NavLink>
            <NavLink className='navlink' to={{ pathname: "/addCoin" }}>
              <h3>Add New Coin</h3>
            </NavLink>
          </div>
          {this.props.allCoins.map((coin) => {
            return (
              <div key={coin.id} className='coin-menu-item'>
                <img src={coin.obverse} alt={coin.name} />
                <div className='item-info'>
                  <h3>{coin.name}</h3>

                  <p>{coin.shortInfo}</p>
                </div>
                <NavLink
                  to={{
                    pathname: `/coin/edit/${coin.id}`,
                    state: {
                      id: `${coin.id}`,
                    },
                  }}
                >
                  <button className='button'>Edit</button>
                </NavLink>
                <button
                  className='button'
                  id={coin.id}
                  onClick={this.toggleWindow}
                >
                  Delete
                </button>
              </div>
            );
          })}
          {this.state.deleteClicked && (
            <div className='modal-background'>
              <div className='delete-modal'>
                <p>Do you want to delete this coin?</p>
                <div>
                  <button className='button' onClick={this.handleDelete}>
                    Yes
                  </button>
                  <button className='button' onClick={this.toggleWindowBack}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allCoins: state.allCoins.allCoins,
    loading: state.allCoins.loading,
  };
};

export default connect(mapStateToProps)(AdminPanel);
