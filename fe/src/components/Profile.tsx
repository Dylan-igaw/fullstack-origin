import * as React from 'react';
import '../css/Profile.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";
import validateLogin from "./ValidateLogin";


interface renderItem {
    data: any,
}

class RenderList extends React.Component<renderItem> {
    render() {
        if(this.props.data === null) return '';
        return <ul>
            <li>이름 : {this.props.data.name}</li>
            <li>나이 : {this.props.data.age}</li>
            <li>보유차량
                <ul>
                    <li>
                        {this.props.data.cars[0].name}
                    </li>
                    <ul>
                        <li>모델 : {this.props.data.cars[0].models.join(', ')}</li>
                    </ul>
                    <li>
                        {this.props.data.cars[1].name}
                    </li>
                    <ul>
                        <li>모델 : {this.props.data.cars[1].models.join(', ')}</li>
                    </ul>
                    <li>
                        {this.props.data.cars[2].name}
                    </li>
                    <ul>
                        <li>모델 : {this.props.data.cars[2].models.join(', ')}</li>
                    </ul>
                </ul>
            </li>
        </ul>;
    }
}

@observer
export default class Profile extends React.Component<any> {

    @observable
    private loginId: string | null = sessionStorage.getItem("id");

    @observable
    private profileList: any = null;

    @action
    insertJsonData = (data: any) => {
        this.profileList = data;
    };

    loadProfile = () => {
        const url: string = 'http://localhost:3001/profile';
        const header: object = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        };
        fetch(url, header)
            .then(res => res.json())
            .then((parserJson) => {
                if (parserJson.rs) {
                    console.log(parserJson.message);
                    this.insertJsonData(parserJson.data);
                } else {
                    this.insertJsonData(null);
                    alert(parserJson.message);
                }
            });
    };

    render() {
        if (validateLogin()) return <div className="profile">
            <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
        </div>;

        return <div className="profile">
            <>
                <button className="load-btn" onClick={this.loadProfile}>
                    Load Profile
                </button>
            </>
            <div className="profile-list">
                <RenderList data={this.profileList}/>
            </div>
        </div>
    }
}