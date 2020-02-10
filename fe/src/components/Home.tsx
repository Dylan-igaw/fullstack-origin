import * as React from 'react';
import '../css/Home.css';
import Login from './Login-popup';
// @ts-ignore
import logo from "../resource/logo.svg";

interface HomeProps {
    loginId: any,
    showPopup: boolean
}

export default class Home extends React.Component<any, HomeProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            loginId: null,
            showPopup: false,
        }
    }

    setLoginId = (id: any) => {
        this.setState({
            loginId: id,
        });
    };

    togglePopup = () => {
        if (this.state.loginId === null) {
            this.setState({
                showPopup: !this.state.showPopup
            });
        } else {
            this.setState({
                loginId: null
            });
            sessionStorage.clear();
        }
    };

    closePopup = () => {
        this.setState({
            showPopup: false
        });
    };

    render() {
        return (
            <div className="Home">
                <img src={logo} className="Home-logo" alt="logo"/>
                <p>
                    CREATE REACT APP: test/123
                </p>

                <button onClick={this.togglePopup}>
                    {(this.state.loginId === null) ? "Sign In" : "Sign Out"}
                </button>

                {this.state.showPopup && <Login closePopup={this.closePopup} setId={this.setLoginId}/>}
            </div>
        );
    }
}
