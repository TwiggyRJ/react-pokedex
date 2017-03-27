import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './index.css';

import App from './App'

import * as pokemonActions from './actions/pokemonActions.js';

import configureStore from './store/configureStore';
const store = configureStore();

store.dispatch(pokemonActions.fetchPokemon('1'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
