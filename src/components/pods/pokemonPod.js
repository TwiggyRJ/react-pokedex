import React, { Component } from 'react';
import './pokePod.css';


class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ "pokePod half bg-red pad-20" }>
        <div className="bg-white pod-img">
          <img src={ this.props.pokemon.sprites.front_default } />
        </div>
      </div>
    );
  }
}

export default Body;
