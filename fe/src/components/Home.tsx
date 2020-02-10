import * as React from 'react';
import '../css/Home.css';
import Login from './Login-popup';
import {Button, Segment} from 'semantic-ui-react'
// @ts-ignore
import logo from "../resource/logo.svg";

interface HomeProps {
    loginId:string,
    showPopup:boolean
}

export default class Home extends React.Component<any, HomeProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            loginId: '',
            showPopup: false,
        }
    }

    setLoginId = (id: string) => {
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
            showPopup: false
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
