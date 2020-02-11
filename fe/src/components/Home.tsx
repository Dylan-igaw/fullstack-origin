import * as React from 'react';
import '../css/Home.css';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import Login from './Login-popup';
// @ts-ignore
import logo from "../resource/logo.svg";

@observer
export default class Home extends React.Component<any> {

    @observable
    private loginId: string = '';
    @observable
    private showPopup: boolean = false;

    @action
    setShowPopup = (state: boolean) => {
        this.showPopup = state;
    }

    @action
    setLoginId = (id: string) => {
        this.loginId = id;
    };

    @action
    togglePopup = () => {
        if (this.loginId === '') {
            this.setShowPopup(!this.showPopup);
        } else {
            this.setLoginId('');
            sessionStorage.clear();
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
                    {(this.loginId === '') ? "Sign In" : "Sign Out"}
                </button>

                {this.showPopup && <Login closePopup={this.closePopup} setId={this.setLoginId}/>}
            </div>
        );
    }
}
