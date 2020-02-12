import * as React from 'react';
import '../css/Login-popup.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";
import cookie from 'react-cookies';

interface LoginProps {
    setId(): void,
    closePopup(): void,
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

    /*
    --HTTP HEADER
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include,', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
     */
    returnObject = (insert: object):object => {
        let data: object = insert;
        let header: object = {
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        };
        return header;
    }

    @action
    doPost = () =>{
        let redirectUrl: string = 'http://localhost:3001/login';
        let redirectHeader = this.returnObject({
            "insertId" : this.insertId,
            "insertPw" : this.insertPw,
        });
        fetch(redirectUrl, redirectHeader)
            .then((res) => {
                console.log(cookie.loadAll());
                let logged = cookie.load('checked');
                if(logged === 'true'){
                    sessionStorage.setItem("id", this.insertId);
                    this.props.setId();
                    this.props.closePopup();
                }else{
                    alert('login failed.');
                }
            })
            .then(() => {
                //
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