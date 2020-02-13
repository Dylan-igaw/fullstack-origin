import * as React from "react";
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import './css/Header.css';
import Home from './components/Home';
import Profile from "./components/Profile";
import Game from "./components/Game";

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="Header">
                <Router>
                    <nav>
                        <Link to="/home" className="Header-link">Home</Link>
                        <Link to="/profile" className="Header-link">Profile</Link>
                        <Link to="/game" className="Header-link">Game</Link>
                    </nav>
                    <hr/>
                    <hr/>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/game" component={Game}/>
                        <Route path="/profile" component={Profile}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;