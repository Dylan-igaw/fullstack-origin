import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import './css/Header.css';
import Home from './components/Home';
import Game from "./components/Game";
  

class App extends React.Component{
  render() {
    return (
        <div className="Header">
          <Router>
            <div>
              <nav>
                <p>
                  <Link to="/home">Home</Link>
                  <Link to="/game">Game</Link>
                </p>
              </nav>
            </div>
            <hr/>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div>
              <Switch>
                <Route path="/game">
                  <Game />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>

    )
  }
}

export default App;