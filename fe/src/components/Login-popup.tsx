import * as React from 'react';
import {ChangeEvent, FormEvent} from 'react';
import '../css/Login-popup.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";

interface LoginProps {
    updateLoginId(): void,

    closePopup(): void,
}

@observer
export default class Login extends React.Component<LoginProps> {
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
        this.doLogin();
        event.preventDefault();
    };

    makeRequestHeader = (data: object): object => {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        };
    };

    @action
    doLogin = () => {
        const url: string = 'http://localhost:3001/login';
        const header: object = this.makeRequestHeader({
            "id": this.insertId,
            "password": this.insertPw,
        });
        fetch(url, header)
            .then(res => res.json())
            .then((parserJson) => {
                if (parserJson.rs) {
                    console.log(parserJson.msg);
                    sessionStorage.setItem("id", this.insertId);
                    this.props.updateLoginId();
                    this.props.closePopup();
                } else {
                    alert(parserJson.msg);
                }
            });
    };

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
