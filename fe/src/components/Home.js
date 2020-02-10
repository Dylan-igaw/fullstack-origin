import React from 'react';
import '../css/Home.css';
import logo from '../resource/logo.svg';
import Login from './Login-popup';
import {Button, Segment} from 'semantic-ui-react'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            showPopup: false,
        }
    }

    setLoginId = (id) => {
        this.setState({
            loginId: id,
        });
    };

    togglePopup = () => {
        if (this.state.loginId === '') {
            this.setState({
                showPopup: !this.state.showPopup
            });
        } else {
            sessionStorage.clear();
            this.setState({
                loginId: ''
            });
        }
    };

    closePopup = () => {
        this.setState({
            showPopup: false,
        });
    };

    render() {
        return (
            <div className="Home">
                <img src={logo} className="Home-logo" alt="logo"/>
                <p>
                    TEST: CREATE REACT APP
                </p>

                <Segment inverted>
                    <Button inverted color='teal' onClick={this.togglePopup}>
                        {(this.state.loginId === '') ? "Sign In" : "Sign Out"}
                    </Button>
                </Segment>

                {this.state.showPopup && <Login closePopup={this.closePopup} setId={this.setLoginId}/>}
            </div>
        );
    }
}
