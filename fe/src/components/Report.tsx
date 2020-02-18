import * as React from 'react';
import '../css/Report.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";
import validateLogin from "./ValidateLogin";
import CssBaseline from "@material-ui/core/CssBaseline";
import {List, ListItem, Button} from "@material-ui/core";

@observer
export default class Report extends React.Component<any> {
    @observable
    private logList: any = null;

    componentDidMount(): void {
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href]);
    }

    @action
    insertJsonData = (data: any) => {
        this.logList = data;
    };

    viewLog = () => {
        const url:string = "http://192.168.0.128:3001/viewLog";
        const header: object = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            sameSite: 'None',
            body: JSON.stringify({"id" : sessionStorage.getItem("id")}),
        };
        fetch(url, header)
            .then(res => res.json())
            .then((parserJson) => {
                parserJson.rs ? this.insertJsonData(parserJson.data) : alert(parserJson.message);
            });
    };

    render() {
        if (validateLogin()) return <div className="report">
            <CssBaseline />
            <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
        </div>;

        return <div className="report">
            <CssBaseline />
            <>
                <Button variant={"contained"} color={"secondary"} className="load-btn" onClick={this.viewLog}>
                    View Log
                </Button>
            </>
            <div className="report-list">
                <List>
                {
                    this.logList && Object.keys(this.logList).map((k,i)=>{
                        return <ListItem key={i}>{JSON.stringify(this.logList[k])}</ListItem>
                    })
                }
                </List>
            </div>
        </div>
    }
}