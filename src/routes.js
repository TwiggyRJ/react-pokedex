import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import HomePage from './pages/Home'
import Pokemon from './pages/Pokemon'
import App from './App'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ HomePage }></IndexRoute>
    <Route path="/pokemon" component={ Pokemon }></Route>
  </Route>
)
