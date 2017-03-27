import AppDispatcher from '../dispatcher/AppDispatcher';
import { PokemonConstants } from '../constants/PokemonConstants';
import { EventEmitter } from 'events';
import { createStore, compose, applyMiddleware } from 'redux';

let pokemonReducer = function(state, action) {
  if (state === undefined) {
    state = [];
  }
  if (action.type === 'GET_POKEMON') {
    state.push(action.pokemon);
  }
  return state;
}

const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {
  pokemon: '',
  pokemonUrl: '/api/v2/pokemon/'
};

// Our views will use these event listeners
class PokemonStoreClass extends EventEmitter {
  addChangeListener(e) {
    this.on(CHANGE_EVENT, e);
  }

  removeChangeListener(e) {
    this.removeListener(CHANGE_EVENT, e);
  }

  getPokemon() {
    return _store;
  }
}

//Instantiate our store
const PokemonStore = new PokemonStoreClass();

//Registering actions for our Dispatcher
AppDispatcher.register((payload) => {
  const action = payload.action;

  switch(action.actionType) {
    case PokemonConstants.GET_ITEM:
      _store.pokemon = action.pokemon;
      PokemonStore.emit(CHANGE_EVENT);
    break;

    case PokemonConstants.STORE_ITEM:
      PokemonStore.emit(CHANGE_EVENT);
    break;

    default:
      return true;
    break;
  }
});

export default PokemonStore;
