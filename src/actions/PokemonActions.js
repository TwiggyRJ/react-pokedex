import * as actionTypes from './actionTypes';
import PokemonApi from '../api/PokemonApi'
import Axios from 'axios';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonSuccess = (pokemon) => {
  console.log(pokemon);
  return {
    type: actionTypes.FETCH_POKEMON_SUCCESS,
    pokemon
  }
};

//Async Action
export const fetchPokemon = (pokemon) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    let cache = PokemonApi.getCachedPokemon(apiUrl, pokemon);
    cache.then(data => {
      return dispatch(fetchPokemonSuccess(data));
    }).catch(error => {
      return PokemonApi.getPokemon(apiUrl, pokemon).then(data => {
        dispatch(fetchPokemonSuccess(data));
      }).catch(error => {
        throw(error);
      });
    });
  };
};
