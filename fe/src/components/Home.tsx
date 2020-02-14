import * as React from 'react';
import '../css/Home.css';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import Login from './Login-popup';
import cookie from 'react-cookies';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from "@material-ui/core";
// @ts-ignore
import logo from "../resource/logo.svg";

@observer
export default class Home extends React.Component<any> {

    @observable
    private loginId: string | null = sessionStorage.getItem("id");
    @observable
    private showPopup: boolean = false;

    @action
    setShowPopup = (state: boolean) => {
        this.showPopup = state;
    };

    componentDidMount(): void {
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href]);
    }

    @action
    updateLoginId = () => {
        this.loginId = sessionStorage.getItem("id");
    };

    @action
    togglePopup = () => {
        if (this.loginId === null) {
            this.setShowPopup(!this.showPopup);
        } else {
            sessionStorage.clear();
            cookie.remove('authKey');
            this.updateLoginId();
        }
    };

    @action
    closePopup = () => {
        this.showPopup = false;
    };

    render() {
        return (
            <div className="Home">
                <CssBaseline />
                <img src={logo} className="Home-logo" alt="logo"/>
                <p>
                    CREATE REACT APP: test/123
                </p>

                <Button variant={"outlined"} color="secondary" onClick={this.togglePopup}>
                    {(this.loginId === null) ? "Sign In" : "Sign Out"}
                </Button>

                {this.showPopup && <Login closePopup={this.closePopup} updateLoginId={this.updateLoginId}/>}
            </div>
        );
    }
}
