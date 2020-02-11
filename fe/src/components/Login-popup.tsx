import * as React from 'react';
import '../css/Login-popup.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";

const id = 'test';
const pw = '123';

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
        if (id === this.insertId && pw === this.insertPw) {
            sessionStorage.setItem("id", id);
            this.props.setId();
            this.props.closePopup();
        } else {
            alert("login failed:: " + this.insertId + '/' + this.insertPw);
        }
        event.preventDefault();
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

export default Login;