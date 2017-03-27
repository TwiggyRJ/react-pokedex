import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Home';
import Pokemon from './pages/Pokemon';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="full navbar bg-red pad-20 margin-bottom-50">
            <ul className="nav align-left">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pokemon">Pokemon</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/pokemon" component={ Pokemon }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
