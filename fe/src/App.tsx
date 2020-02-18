import * as React from "react";
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import './css/Header.css';
import Home from './components/Home';
import Profile from "./components/Profile";
import Game from "./components/Game";
import Report from "./components/Report";

import { makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import Login from "./components/Login-popup";
import cookie from "react-cookies";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const StyleAppButton = withStyles({
    root: {
        marginLeft: '80%',
    },
})(Button);

const StyleTypography = withStyles({
    root: {
        marginLeft: '10px',
    },
})(Typography);


@observer
export default class App extends React.Component<any, any> {
    private classes: any = useStyles;

    @observable
    private __anchorEl: any = null;
    @observable
    private loginId: string | null = sessionStorage.getItem("id");
    @observable
    private showPopup: boolean = false;

    @action
    updateLoginId = () => {
        this.loginId = sessionStorage.getItem("id");
    };

    @action
    setShowPopup = (state: boolean) => {
        this.showPopup = state;
    };

    @action
    togglePopup = () => {
        if (this.loginId === null) {
            this.setShowPopup(!this.showPopup);
        } else {
            this.doLogout();
        }
    };

    doLogout = () => {
        const url: string = 'http://192.168.0.128:3001/logout';
        const header: object = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            sameSite: 'None',
        };
        fetch(url, header)
            .then(res => res.json())
            .then((parserJson) => {
                if (parserJson.rs) {
                    console.log(parserJson.msg);
                    this.clearLoginInfo();
                } else {
                    this.clearLoginInfo();
                    alert(parserJson.msg);
                }
            });
    };

    @action
    clearLoginInfo = () => {
        sessionStorage.clear();
        cookie.remove('authKey');
        this.updateLoginId();
    }

    @action
    closePopup = () => {
        this.showPopup = false;
    };

    @action
    setAnchorEl = (toggle: any) => {
        this.__anchorEl = toggle;
    };

    handleClick = (event: any) => {
        this.setAnchorEl(event.currentTarget);
    };

    handleClose = () => {
        this.setAnchorEl(null);
    };

    render() {
        return (
            <div className={"Header"}>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}/>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.__anchorEl}
                                keepMounted
                                open={Boolean(this.__anchorEl)}
                                onClose={this.handleClose}
                            >
                                <Link to="/home">
                                    <MenuItem onClick={this.handleClose}>Home</MenuItem>
                                </Link>
                                <Link to="/profile">
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                </Link>
                                <Link to="/game">
                                    <MenuItem onClick={this.handleClose}>Game</MenuItem>
                                </Link>
                                <Link to="/report">
                                    <MenuItem onClick={this.handleClose}> Report </MenuItem>
                                </Link>
                            </Menu>
                            <StyleTypography variant="h6" className={this.classes.title}>
                                {window.location.pathname === '/' ? 'Fullstack :) ' : window.location.pathname.substring(1)}
                            </StyleTypography>
                            <StyleAppButton color="inherit"  onClick={this.togglePopup}>
                                {(this.loginId === null) ? "login" : "logout"}
                            </StyleAppButton>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to={'/home'}/>}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/game" component={Game}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/report" component={Report}/>
                    </Switch>
                </Router>
                {this.showPopup && <Login closePopup={this.closePopup} updateLoginId={this.updateLoginId}/>}
            </div>
        )
    }
}