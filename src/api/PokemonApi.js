import Axios from 'axios';

class PokemonApi {
  static getPokemon(apiUrl, pokemon) {
    let idbCheck = false;
    let dbRequest = indexedDB.open('pokemon_app');
    let db;
    let key = apiUrl + pokemon;

    if(window.indexedDB) {
      idbCheck = true;
      console.log('indexedDB FTW');

      dbRequest.onupgradeneeded = function(e) {
        console.log("running onupgradeneeded");
        let thisDB = e.target.result;

        if(!thisDB.objectStoreNames.contains("pokemon")) {
          thisDB.createObjectStore("pokemon");
        }
      }

      dbRequest.onsuccess = function(e) {
        console.log("Success!");
        db = e.target.result;
      }

      dbRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
      }

    }

    return Axios.get(key)
      .then(response => {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log(db);

        let data = response.data;

        data.types = data.types.reverse();

        if(idbCheck) {
          let object = { [key]: data, timestamp: new Date().getTime()}
          let transaction = db.transaction(["pokemon"], "readwrite");
          let store = transaction.objectStore("pokemon");
          let request = store.add(object, key);

          request.onerror = function(e) {
            console.log("Error",e.target.error.name);
            //some type of error handler
          }

          request.onsuccess = function(e) {
            console.log("Woot! Did it");
          }
        }
        return data;
      }).catch(error => {
        throw(error);
      });
  }

  static getCachedPokemon(apiUrl, pokemon) {
    return new Promise(function (resolve, reject) {
      let idbCheck = false;
      let dbRequest = indexedDB.open('pokemon_app');
      let db;
      let key = apiUrl + pokemon;

      if(window.indexedDB) {
        idbCheck = true;
        console.log('indexedDB FTW');

        dbRequest.onupgradeneeded = function(e) {
          console.log("running onupgradeneeded");
          let thisDB = e.target.result;

          if(!thisDB.objectStoreNames.contains("pokemon")) {
            thisDB.createObjectStore("pokemon");
          }
        }

        dbRequest.onsuccess = function(e) {
          console.log("Success!");
          db = e.target.result;

          let transaction = db.transaction(["pokemon"], "readonly");
          let store = transaction.objectStore("pokemon");
          let request = store.get(key);

          request.onsuccess = function(e) {
            let data = e.target.result;
            if (data !== undefined) {
              console.log("data retrieved");
              console.log(data[key]);

              let itemCreated = new Date(data.timestamp),
              now = new Date().getTime(),
              lastWeek = new Date(now - 7 * 24 * 60 * 60 * 1000);
              console.log(now);

              if (itemCreated > lastWeek) {
                console.log("lol");
                resolve(data[key]);
              } else {
                reject(false);
              }
            } else {
              console.log("data retrieval failed, no such result");
              reject(false);
            }
          }

          request.onerror = function(e) {
            console.log("data retrieval failed");
            reject(false);
          }
        }

        dbRequest.onerror = function(e) {
          console.log("Error");
          console.dir(e);
          reject(false);
        }
      } else {
        reject(false);
      }
    });
  }

}

export default PokemonApi;
