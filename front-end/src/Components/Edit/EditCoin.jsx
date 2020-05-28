import React, { Component } from "react";
import Input from "../Input/Input";
import "./style.css";
import { connect } from "react-redux";
import history from "../../History";

class EditCoin extends Component {
  state = {
    coin: {},
    edited: false,
  };
  componentDidMount = () => {
    fetch(`http://localhost:3005/coin/${this.props.match.params.id}`)
      .then((resp) => resp.json())
      .then((res) => {
        const coin = res;
        this.setState({
          coin: coin,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInput = (e) => {
    this.setState({
      coin: { ...this.state.coin, [e.target.id]: e.target.value },
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3005/updateCoin/${this.state.coin.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coin: this.state.coin }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          edited: true,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { coin } = this.state;
    return (
      <div>
        {this.state.edited && (
          <div className='modal-background'>
            <div className='delete-modal'>
              <p>The changes have been made! Thanks for your contribution</p>
              <button
                className='violet-button'
                onClick={() => {
                  this.setState({ edited: false });
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
        <form className='inputs-container' onSubmit={this.handleSubmit}>
          <div className='first-container'>
            <Input
              id='name'
              height='48'
              type='text'
              label='Coin Name'
              value={coin.name}
              handle={this.handleInput}
            />
            <Input
              id='faceVal'
              height='48'
              type='text'
              label='Face Value'
              value={coin.faceVal}
              handle={this.handleInput}
            />
            <Input
              id='year'
              height='48'
              type='number'
              label='Year of Issue'
              value={coin.year}
              handle={this.handleInput}
            />
            <Input
              id='price'
              height='48'
              type='number'
              label='Price'
              value={coin.price}
              handle={this.handleInput}
            />
            <Input
              id='country'
              height='48'
              type='text'
              label='Country'
              value={coin.country}
              handle={this.handleInput}
            />
            <Input
              id='metal'
              height='48'
              type='text'
              label='Metal'
              value={coin.metal}
              handle={this.handleInput}
            />
          </div>
          <div className='second-container'>
            <label htmlFor='short-info'>Short Description</label>
            <textarea
              id='shortInfo'
              name='short-info'
              wrap='soft'
              value={coin.shortInfo}
              onChange={this.handleInput}
            ></textarea>
            <label htmlFor='long-info'>Long Description</label>
            <textarea
              id='longInfo'
              name='long-info'
              wrap='soft'
              value={coin.longInfo}
              onChange={this.handleInput}
            ></textarea>
            <Input
              id='quality'
              height='48'
              type='text'
              label='Quality'
              value={coin.quality}
              handle={this.handleInput}
            />
            <Input
              id='weight'
              height='48'
              type='text'
              label='Weight'
              value={coin.weight}
              handle={this.handleInput}
            />
          </div>
          <div className='third-container'>
            <div className='third-inputs'>
              <Input
                id='obverse'
                height='48'
                type='text'
                label='Link to obverse of the coin'
                value={coin.obverse}
                handle={this.handleInput}
              />
              <Input
                id='reverse'
                height='48'
                type='text'
                label='Link to reverse of the coin'
                value={coin.reverse}
                handle={this.handleInput}
              />
              <Input
                id='type'
                height='48'
                type='text'
                label='Type'
                value={coin.type}
                handle={this.handleInput}
              />
            </div>

            <div className='for-buttons'>
              <button className='save-button' type='submit'>
                Save
              </button>
              <button
                className='cancel-button'
                onClick={() => {
                  history.goBack();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    coin: state.coin.coin,
  };
};
export default connect(mapStateToProps)(EditCoin);
