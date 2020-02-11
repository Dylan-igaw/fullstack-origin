import * as React from 'react';
import '../css/Login-popup.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";

interface LoginProps {
    setId(): void,
    closePopup(): void
}

@observer
export class Login extends React.Component<LoginProps> {
    @observable
    private insertId: string = '';

    @observable
    private insertPw: string = '';

    @action
    handleChangeId = (event: ChangeEvent<HTMLInputElement>) => {
        this.insertId = event.target.value;
    };

    @action
    handleChangePw = (event: ChangeEvent<HTMLInputElement>) => {
        this.insertPw = event.target.value;
    };

    @action
    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        this.doPost();
        event.preventDefault();
    }

    @action
    doPost = () => {
        let url: string = 'http://localhost:3001/login';
        let data: object = {
            "insertId": this.insertId,
            "insertPw": this.insertPw
        };
        let header: object = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        fetch(url, header)
            .then(response => response.json())
            .then(result => {
                if (result.checked) {
                    sessionStorage.setItem("id", this.insertId);
                    this.props.setId();
                    this.props.closePopup();
                } else {
                    alert("login failed.");
                }
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="Login-popup">
                    <div className="Login-inner">
                        <p>Login <input type="button" className="close-btn" onClick={this.props.closePopup}
                                        value="close"/></p>
                        <label htmlFor="id">ID</label> <input type="text" className="login-input" id="id"
                                                              value={this.insertId}
                                                              onChange={this.handleChangeId}/>
                        <label htmlFor="pw">PW</label> <input className="login-input" type="password" id="pw"
                                                              value={this.insertPw}
                                                              onChange={this.handleChangePw}/>
                        <input type="submit" value="login"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;