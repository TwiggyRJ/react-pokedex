import AppDispatcher from '../dispatcher/AppDispatcher';
import { PokemonConstants } from '../constants/PokemonConstants';

export function getPokeData(pokemon) {
  AppDispatcher.handleViewAction({
    actionType: PokemonConstants.GET_ITEM,
    pokemon: pokemon,
  });
}

export function storeItem() {
  AppDispatcher.handleViewAction({
    actionType: PokemonConstants.STORE_ITEM,
  });
}
