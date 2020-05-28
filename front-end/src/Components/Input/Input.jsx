import React, { Component } from "react";
import "./style.css";

class Input extends Component {
  render() {
    return (
      <div className='input-div'>
        <label htmlFor={this.props.label}>{this.props.label}</label>
        <input
          id={this.props.id}
          style={{ height: Number(this.props.height) }}
          className='uni-input'
          required
          type={this.props.type}
          defaultValue={this.props.defaultValue}
          rows={1 || this.props.rows}
          onChange={this.props.handle}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default Input;
