import * as React from 'react';
import {ChangeEvent} from 'react';
import '../css/Login-popup.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const StyleTextField = withStyles({
    root: {
        width: '150px',
        marginRight: '10px',
    },
})(TextField);

const StyleButton1 = withStyles({
    root: {
        height: '56px',
        marginRight: '10px',
    },
})(Button);

const StyleButton2 = withStyles({
    root: {
        marginLeft: '80%',
    },
})(Button);

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

    componentDidMount(): void {
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href+'(login)']);
    }

    @action
    handleChangeId = (event: ChangeEvent<HTMLInputElement>) => {
        this.insertId = event.target.value;
    };

    @action
    handleChangePw = (event: ChangeEvent<HTMLInputElement>) => {
        this.insertPw = event.target.value;
    };

    makeRequestHeader = (data: object): object => {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            sameSite: 'None',
            body: JSON.stringify(data),
        };
    };

    @action
    doLogin = () => {
        const url: string = 'http://192.168.0.128:3001/login';
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
            <div className="Login-popup">
                <div className="Login-inner">
                    <CssBaseline />
                    <p>
                        Login
                        <StyleButton2 color="inherit" onClick={this.props.closePopup}>close</StyleButton2>
                    </p>
                    <StyleTextField id={"id"} label={"id: test"} variant={"outlined"} value={this.insertId} onChange={this.handleChangeId} />
                    <StyleTextField id={"pw"} type="password" label={"pw: 123"} variant={"outlined"} value={this.insertPw} onChange={this.handleChangePw} />
                    <StyleButton1 variant={"contained"} color={"primary"} onClick={this.doLogin}>login</StyleButton1>
                </div>
            </div>
        );
    }
}
