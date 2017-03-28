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
    let isCached = new Promise(function(resolve, reject) {
      let cached = PokemonApi.getCachedPokemon(apiUrl, pokemon);
      console.log(cached);
      if (cached) {
        resolve(cached);
      } else {
        reject(false);
      }
    });
    console.log(isCached);
    isCached.then((data) => {
      console.log("Loading Cached Data");
      return dispatch(fetchPokemonSuccess(isCached));
    }).catch((error) => {
      console.log("Fetching New Data");
      return PokemonApi.getPokemon(apiUrl, pokemon).then(data => {
        dispatch(fetchPokemonSuccess(data));
      }).catch(error => {
        throw(error);
      });
    });
  };
};
