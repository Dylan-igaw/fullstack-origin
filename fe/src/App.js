import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import './css/Header.css';
import Home from './components/Home';
import Game from "./components/Game";

class App extends React.Component {

    routeEventHandle = (event) => {
        if (sessionStorage.getItem("id") === null) {
            alert("로그인 후 이용해 주세요");
        }
    };

    render() {
        return (
            <div className="Header">
                <Router>
                    <nav>
                        <Link to="/home" className="Header-link">Home</Link>
                        <Link to="/game" className="Header-link" onClick={this.routeEventHandle}>Game</Link>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route path="/game" component={Game}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>

        )
    }
}

export default App;