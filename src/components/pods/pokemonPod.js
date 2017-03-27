import React, { Component } from 'react';
import './pokePod.css';


class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ "pokepod half bg-red pad-20 hidden" }>
        <div className="bg-white pod-img left">
          <img src={ this.props.pokemon.sprites.front_default } />
        </div>
        <div className="margin-left-20 white left">
          <p>{ this.props.pokemon.name }</p>
        </div>
      </div>
    );
  }
}

export default Body;
