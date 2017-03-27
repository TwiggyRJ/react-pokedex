import * as actionTypes from './actionTypes';
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
    let storageCheck = false;
    let key = apiUrl + pokemon;
    if(window.localStorage) {
      console.log('localStorage FTW');
      if (localStorage.getItem(key) !== null) {
        let item = JSON.parse(localStorage.getItem(key)),
        itemCreated = new Date(item.timestamp),
        now = new Date().getTime(),
        lastWeek = new Date(now - 7 * 24 * 60 * 60 * 1000);
        console.log(now);

        if (itemCreated > lastWeek) {
          let data = item[key];
          storageCheck = true;
          dispatch(fetchPokemonSuccess(data))
        } else {
          localStorage.removeItem(key);
        }
      }
    }

    if (storageCheck == false) {
      // Returns a promise
      return Axios.get(key)
        .then(response => {
          // Dispatch another action
          // to consume data
          console.log(response);

          let data = response.data;

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

          dispatch(fetchPokemonSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    }
  };
};
