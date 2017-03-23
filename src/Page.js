
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './loading.css';
import pokeball from './Pokeball.svg';
import Body from './components/body';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {pokemon: '', pokemonUrl: '/api/v2/pokemon/'};
    this.navigatePokemon = this.navigatePokemon.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
  }

  componentWillMount() {
    this.getData(this.state.pokemonUrl + this.props.default, 'pokemon');
  }

  shouldComponentUpdate() {
    return true;
  }

  onChildChanged(newState, type) {
    this.getData(this.state.contentPostsUrl+newState, type);
    this.setState({root: false});
  }

  getData(toGet, value) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://pokeapi.co' + toGet, true);
    xhr.onload = () => {
        if(xhr.status === 200) {
            console.log('Yay it works');
            console.log(JSON.parse(xhr.response));
            this.setState({[value]: JSON.parse(xhr.response)}, () => console.log(this.state));
        } else if (xhr.status === 400) {
            console.log('Bad Request :(');
        }
    };
    xhr.send();
  }

  navigatePokemon(e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.getData(this.state.pokemonUrl+id, 'pokemon');
    e.preventDefault();
  }

  searchPokemon(e) {
    let search = e.target.value;
    search = search.toLowerCase();
    this.getData(this.state.pokemonUrl + search, 'pokemon');
  }

  render() {
    if (this.state.pokemon !== "") {
      let types = this.state.pokemon.types.reverse();
      let type = [];
      let next = this.state.pokemon.id + 1;
      let prev = this.state.pokemon.id - 1;
      let primaryType;

      types.forEach(function (val, i) {
        if (i == 0) {
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
                <img src={ this.state.pokemon.sprites.front_default } alt="logo" />
                <div className="">
                  <a className="left white" href="#" data-id={prev} onClick={ this.navigatePokemon }>Prev</a> <h2 className="inline">{ this.state.pokemon.name }</h2> <a className="right white" href="#" data-id={next} onClick={ this.navigatePokemon }>Next</a>
                </div>
                <h2>Pokedex ID: {this.state.pokemon.id }</h2>
                {type}
              </div>
              <div className="margin-top-15">
                <input className="input-large" type="text" onChange={ this.searchPokemon } placeholder="Enter the Pokedex Entry ID or the Pokemon's name"/>
              </div>
            </div>
            <Body pokemon={ this.state.pokemon }/>
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

export default Page;
