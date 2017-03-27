import React, { Component } from 'react';
import { Link } from 'react-router';
import PokePod from '../components/pods/pokemonPod';

import { connect } from 'react-redux';
import * as pokemonActions from '../actions/pokemonActions';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div>Hello World</div>
        <PokePod pokemon={ this.props.pokemon }/>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // this.props.pokemon
    pokemon: state.pokemon
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.fetchPokemon
    fetchPokemon: pokemon => dispatch(pokemonActions.fetchPokemon(pokemon))
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
