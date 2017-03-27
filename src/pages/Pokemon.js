import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../loading.css';
import pokeball from '../Pokeball.svg';
import Body from '../components/body';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import * as pokemonActions from '../actions/pokemonActions';

class Pokemon extends Component {

  constructor(props) {
    super(props);
    this.navigatePokemon = this.navigatePokemon.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  navigatePokemon(e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.props.fetchPokemon(id);
    e.preventDefault();
  }

  searchPokemon(e) {
    let search = e.target.value;
    search = search.toLowerCase();
    this.props.fetchPokemon(search);
  }

  render() {
    if (this.props.pokemon !== "") {
      let types = this.props.pokemon.types.reverse();
      let type = [];
      let next = this.props.pokemon.id + 1;
      let prev = this.props.pokemon.id - 1;
      let primaryType;

      types.forEach(function (val, i) {
        if (i === 0) {
          primaryType = val.type.name;
        }
        type.push(val.type.name + " ");
      });

      return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
            <div className="App">
              <div className={"App-header bg-" + primaryType }>
                <img src={ this.props.pokemon.sprites.front_default } alt="logo" />
                <div className="">
                  <a className="left white" href="#" data-id={prev} onClick={ this.navigatePokemon }>Prev</a> <h2 className="inline">{ this.props.pokemon.name }</h2> <a className="right white" href="#" data-id={next} onClick={ this.navigatePokemon }>Next</a>
                </div>
                <h2>Pokedex ID: {this.props.pokemon.id }</h2>
                {type}
              </div>
              <div className="margin-top-15">
                <input className="input-large" type="text" onChange={ this.searchPokemon } placeholder="Enter the Pokedex Entry ID or the Pokemon's name"/>
              </div>
            </div>
            <Body pokemon={ this.props.pokemon }/>
        </ReactCSSTransitionGroup>
      );
    }
    return (
      <div className="absolute-center">
        <img src={ pokeball } className="loading-image" alt="logo" />
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
export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
