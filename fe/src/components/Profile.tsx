import * as React from 'react';
import '../css/Profile.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";
import validateLogin from "./ValidateLogin";
import CssBaseline from "@material-ui/core/CssBaseline";
import {List, ListItem, Button} from "@material-ui/core";


interface renderItem {
    data: any,
}

class RenderList extends React.Component<renderItem> {
    render() {
        if (this.props.data === null) return '';
        return <List>
            <ListItem>이름 : {this.props.data.name}</ListItem>
            <ListItem>나이 : {this.props.data.age}</ListItem>
            <ListItem>보유차량
                <List>
                    <ListItem>
                        {this.props.data.cars[0].name}
                    </ListItem>
                    <List>
                        <ListItem>모델 : {this.props.data.cars[0].models.join(', ')}</ListItem>
                    </List>
                    <ListItem>
                        {this.props.data.cars[1].name}
                    </ListItem>
                    <List>
                        <ListItem>모델 : {this.props.data.cars[1].models.join(', ')}</ListItem>
                    </List>
                    <ListItem>
                        {this.props.data.cars[2].name}
                    </ListItem>
                    <List>
                        <ListItem>모델 : {this.props.data.cars[2].models.join(', ')}</ListItem>
                    </List>
                </List>
            </ListItem>
        </List>;
    }
}

@observer
export default class Profile extends React.Component<any> {

    @observable
    private loginId: string | null = sessionStorage.getItem("id");

    @observable
    private profileList: any = null;

    componentDidMount(): void {
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href]);
    }

    @action
    insertJsonData = (data: any) => {
        this.profileList = data;
    };

    loadProfile = () => {
        const url: string = 'http://192.168.0.128:3001/profile';
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
                if (parserJson.rs) {
                    console.log(parserJson.msg);
                    this.insertJsonData(parserJson.data);
                } else {
                    this.insertJsonData(null);
                    alert(parserJson.msg);
                }
            });
    };

    render() {
        if (validateLogin()) return <div className="profile">
            <CssBaseline/>
            <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
        </div>;

        return <div className="profile">
            <CssBaseline/>
            <Button variant={"contained"} color="primary" className="load-btn" onClick={this.loadProfile}>
                Load Profile
            </Button>
            <div className="profile-list">
                <RenderList data={this.profileList}/>
            </div>
        </div>
    }
}