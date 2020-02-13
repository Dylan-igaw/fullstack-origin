import * as React from 'react';
import '../css/Profile.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";


@observer
export default class Profile extends React.Component<any> {

    @observable
    private loginId: string | null = sessionStorage.getItem("id");

    @observable
    private profileListHtml: object | string = '';

    @action
    makeProfileList = (data: any) => {
        this.profileListHtml = <ul>
            <li>이름 : {data.name}</li>
            <li>나이 : {data.age}</li>
            <li>보유차량
                <ul>
                    <li>
                        {data.cars[0].name}
                    </li>
                    <ul>
                        <li>모델 : {data.cars[0].models.join(', ')}</li>
                    </ul>
                    <li>
                        {data.cars[1].name}
                    </li>
                    <ul>
                        <li>모델 : {data.cars[1].models.join(', ')}</li>
                    </ul>
                    <li>
                        {data.cars[2].name}
                    </li>
                    <ul>
                        <li>모델 : {data.cars[2].models.join(', ')}</li>
                    </ul>
                </ul>
            </li>
        </ul>;
    }

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
                    console.log(parserJson.data);
                    this.makeProfileList(parserJson.data);
                } else {
                    alert(parserJson.message);
                }
            });
    };

    render() {
        if (this.loginId === null) {
            return <div className="Game">
                <div className="Game-header">
                    <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
                </div>
            </div>;
        } else {
            return <div className="profile">
                <>
                    <button className="load-btn" onClick={this.loadProfile}>
                        Load Profile
                    </button>
                </>
                <div className="profile-list">
                    {this.profileListHtml}
                </div>
            </div>;
        }
    }
}