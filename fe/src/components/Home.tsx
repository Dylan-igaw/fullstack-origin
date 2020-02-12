import * as React from 'react';
import '../css/Home.css';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import Login from './Login-popup';
import cookie from 'react-cookies';
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
    }

    @action
    setLoginId = () => {
        this.loginId = sessionStorage.getItem("id");
    };

    @action
    togglePopup = () => {
        if (this.loginId === null) {
            this.setShowPopup(!this.showPopup);
        } else {
            sessionStorage.clear();
            cookie.remove('checked');
            this.setLoginId();
        }
    };

    @action
    closePopup = () => {
        this.showPopup = false;
    };

    render() {
        return (
            <div className="Home">
                <img src={logo} className="Home-logo" alt="logo"/>
                <p>
                    CREATE REACT APP: test/123
                </p>

                <button onClick={this.togglePopup}>
                    {(this.loginId === null) ? "Sign In" : "Sign Out"}
                </button>

                {this.showPopup && <Login closePopup={this.closePopup} setId={this.setLoginId}/>}
            </div>
        );
    }
}
