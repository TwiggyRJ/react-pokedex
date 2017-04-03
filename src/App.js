import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Home';
import Pokemon from './pages/Pokemon';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Page, Toolbar, Button} from 'react-onsenui';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Page>
        <Toolbar>
          <nav>
            <ul className="nav align-left">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pokemon">Pokemon</Link></li>
            </ul>
          </nav>
          </Toolbar>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/pokemon" component={ Pokemon }/>
        </Page>
      </BrowserRouter>
    );
  }
}

export default App;
