import * as React from 'react';
import '../css/Home.css';
import {observer} from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
// @ts-ignore
import logo from "../resource/logo.svg";

@observer
    export default class Home extends React.Component {
    constructor(props: any) {
        super(props);
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href]);
    }

    render() {
        return (
            <div className="Home">
                <CssBaseline/>
                <img src={logo} className="Home-logo" alt="logo"/>
                <p>
                    WELCOME FULLSTACK :)
                </p>
            </div>
        );
    }
}
