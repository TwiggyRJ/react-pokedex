export const pokemonReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POKEMON_SUCCESS':
          return action.pokemon;
    default:
          return state;
  }
};
