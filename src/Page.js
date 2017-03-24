
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './loading.css';
import pokeball from './Pokeball.svg';
import Body from './components/body';

import PokemonStore from './stores/PokemonStore';
import { getPokeData, storeItem } from './actions/PokemonActions';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = PokemonStore.getPokemon();
    this.navigatePokemon = this.navigatePokemon.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this._onChange = this._onChange.bind(this);
    this.cacheData = this.cacheData.bind(this);
    this.ajax = this.ajax.bind(this);
    this.processAjax = this.processAjax.bind(this);
  }

  componentWillMount() {
    this.getData(this.state.pokemonUrl + this.props.default, 'pokemon');
  }

  componentDidMount() {
    PokemonStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.removeChangeListener(this._onChange);
  }

  _onChange(target, value) {
    this.setState({
      [target]: value
    }, () => console.log(this.state));
  }

  shouldComponentUpdate() {
    return true;
  }

  onChildChanged(newState, type) {
    this.getData(this.state.contentPostsUrl+newState, type);
    this.setState({root: false});
  }

  getData(toGet, value) {

    if(window.localStorage) {
      console.log('localStorage FTW');
      if (localStorage.getItem(toGet) === null) {
        this.ajax(toGet, value);
      } else {
        let item = JSON.parse(localStorage.getItem(toGet)),
        itemCreated = new Date(item.timestamp),
        now = new Date().getTime(),
        lastWeek = new Date(now - 7 * 24 * 60 * 60 * 1000);
        console.log(now);

        if (itemCreated > lastWeek) {
          let data = item[toGet];
          this._onChange(value, data);
          this.getPokemon(data);
        } else {
          localStorage.removeItem(toGet);
          this.ajax(toGet, value);
        }
      }
    } else {
      this.ajax(toGet);
    }

  }

  ajax(toGet, key) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co' + toGet, true);
    xhr.onload = () => {
        if(xhr.status === 200) {
            console.log('Yay it works');
            let data = JSON.parse(xhr.response);
            console.log(data);
            this.processAjax(toGet, key, data);
        } else if (xhr.status === 400) {
            console.log('Bad Request :(');
        }
    };
    xhr.send();
  }

  processAjax(endpoint, key, data) {
    this.cacheData(endpoint, data);
    this._onChange(key, data);
    this.getPokemon(data);
    console.log(data);
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

  getPokemon(data) {
    console.log(data);
    getPokeData(data);
  }


  cacheData(key, data) {
    if(window.localStorage) {
      var object = { [key]: data, timestamp: new Date().getTime()}
      try {
        localStorage.setItem(key, JSON.stringify(object));
      }
      catch(err) {
        // Just grab the expiry and store the expiry-key into an object
        let expiries = Object.keys(localStorage).reduce(function(collection,key) {
          let currentExpirationTime = JSON.parse(localStorage.getItem(key)).timestamp;
          collection[currentExpirationTime] = key;
          return collection;
        },{});

        // Get the expiry dates into an array
        let expiryDates = Object.keys(expiries);

        // For N times, find the oldest (smallest timestamp) and destroy
        for(let i = 0; i < 1; i++){
          let oldestDate = Math.min.apply(null,expiryDates);
          localStorage.removeItem(expiries[oldestDate]);
        }
      }
    }
  }

  render() {
    if (this.state.pokemon !== '') {
      let types = this.state.pokemon.types.reverse();
      let type = [];
      let next = this.state.pokemon.id + 1;
      let prev = this.state.pokemon.id - 1;
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
