import React, { Component } from "react";
import Input from "../Input/Input";
import history from "../../History";

class AddCoin extends Component {
  state = {
    country: "",
    faceVal: "",
    longInfo: "",
    metal: "",
    name: "",
    obverse: "",
    price: 0,
    quality: "",
    reverse: "",
    shortInfo: "",
    type: "",
    weight: "",
    year: 0,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = () => {
    const {
      country,
      faceVal,
      longInfo,
      metal,
      name,
      obverse,
      price,
      quality,
      reverse,
      shortInfo,
      type,
      weight,
      year,
    } = this.state;
    fetch("http://localhost:3005/addCoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        faceVal,
        longInfo,
        metal,
        name,
        obverse,
        price,
        quality,
        reverse,
        shortInfo,
        type,
        weight,
        year,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.coin);
        history.push("/admin/panel");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className='inputs-container' onSubmit={this.handleSubmit}>
        <div className='first-container'>
          <Input
            id='name'
            height='48'
            type='text'
            label='Coin Name'
            handle={this.handleInput}
            value={this.state.name}
          />
          <Input
            id='faceVal'
            height='48'
            type='text'
            label='Face Value'
            handle={this.handleInput}
            value={this.state.faceVal}
          />
          <Input
            id='year'
            height='48'
            type='number'
            label='Year of Issue'
            handle={this.handleInput}
            value={this.state.year}
          />
          <Input
            id='price'
            height='48'
            type='number'
            label='Price'
            handle={this.handleInput}
            value={this.state.price}
          />
          <Input
            id='country'
            height='48'
            type='text'
            label='Country'
            handle={this.handleInput}
            value={this.state.country}
          />
          <Input
            id='metal'
            height='48'
            type='text'
            label='Metal'
            handle={this.handleInput}
            value={this.state.metal}
          />
        </div>
        <div className='second-container'>
          <label htmlFor='short-info'>Short Description</label>
          <textarea
            id='shortInfo'
            name='short-info'
            wrap='soft'
            onChange={this.handleInput}
            value={this.state.shortInfo}
          ></textarea>
          <label htmlFor='long-info'>Long Description</label>
          <textarea
            id='longInfo'
            name='long-info'
            wrap='soft'
            onChange={this.handleInput}
            value={this.state.longInfo}
          ></textarea>
          <Input
            id='quality'
            height='48'
            type='text'
            label='Quality'
            handle={this.handleInput}
            value={this.state.quality}
          />
          <Input
            id='weight'
            height='48'
            type='text'
            label='Weight'
            handle={this.handleInput}
            value={this.state.weight}
          />
        </div>
        <div className='third-container'>
          <div className='third-inputs'>
            <Input
              id='obverse'
              height='48'
              type='text'
              label='Link to obverse of the coin'
              handle={this.handleInput}
              value={this.state.obverse}
            />
            <Input
              id='reverse'
              height='48'
              type='text'
              label='Link to reverse of the coin'
              handle={this.handleInput}
              value={this.state.reverse}
            />
            <Input
              id='type'
              height='48'
              type='text'
              label='Type'
              handle={this.handleInput}
              value={this.state.type}
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
    );
  }
}

export default AddCoin;
