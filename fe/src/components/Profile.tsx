import * as React from 'react';
import '../css/Profile.css';
//import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {action, observable, toJS} from "mobx";
import {Link} from "react-router-dom";

interface dataList {
    profileListData: object;
}

const generateElement = (key:string,value:any) => {
    return (
        <div key={key} className="row">
            <div className="col-xs-6 ins-label">{key}</div>
            <div className="col-xs-6">{value}</div>
        </div>
    );
}

class ProfileList extends React.Component<dataList> {
    render(){
        const data = toJS(this.props.profileListData);
       /* const List = Object.keys(data).map((key, i) => {
            Object.values(data).map((index) => {
                Object.keys(data[index]).map()
            })
        })*/
        return '';
    }
}

interface TTT {
    name?:string;
}

@observer
export default class Profile extends React.Component<any> {

    @observable
    private loginId:string | null = sessionStorage.getItem("id");

    @observable
    private profileList: any = { name:''};

    @action
    setProfileData = (data:any) => {
        this.profileList = data;
    }

    generateData = (data:any) => {
        const newData = Object.keys(data).reduce((result, currentKey) => {
            if (typeof data[currentKey] === 'string' || typeof data[currentKey] === 'number' || data[currentKey] instanceof String) {
               /* const elementToPush = generateElement(currentKey, data[currentKey]);
                // @ts-ignore
                result.push(elementToPush);*/
                console.log("data-------------------------");
               console.log(currentKey, data[currentKey]);
            } else {
                const nested = this.generateData(data[currentKey]);
                //result.push(...nested);
                console.log("nested-------------------------");
                console.log(...nested);
            }
            return result;
        }, []);
        return newData;
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
                    //this.generateData(toJS(parserJson.data));
                } else {
                    alert(parserJson.message);
                }
            });
    };

    render() {
        let returnHtml: object;
        let tmp = toJS(this.profileList);
        console.log("@@",this.profileList);
        if (this.loginId === null) {
            return                <div className="Game">
                    <div className="Game-header">
                        <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
                    </div>
                </div>;
        } else {
           return                <div className="profile">
                    <button className="load-btn" onClick={this.loadProfile}>
                        Load Profile
                    </button>
                    <div className="profile-list">
                        {this.profileList.cars&&this.profileList.cars.join('')}
                    </div>
                </div>;
        }
       // return returnHtml;
    }
}
//{tmp && this.generateData(tmp)}