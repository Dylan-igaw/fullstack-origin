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
    private profileList: any = {};

    @action
    setProfileData = (data: any) => {
        this.profileList = data;
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
                    this.setProfileData(parserJson.data);
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
                    <h1>이름</h1>
                    <li>{this.profileList.name}</li>
                    <h1>나이</h1>
                    <li>{this.profileList.age}</li>
                    <h1>보유 차량</h1>
                    {
                        this.profileList.cars.map()
                    }
                </div>
            </div>;
        }
    }
}