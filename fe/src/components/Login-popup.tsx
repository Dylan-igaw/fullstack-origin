import * as React from 'react';
import '../css/Login-popup.css';

const id = 'test';
const pw = '123';

interface LoginProps {
    insertId: string,
    insertPw: string
}

export class Login extends React.Component<any, LoginProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            insertId: '',
            insertPw: ''
        };
    }

    handleChangeId = (event: any) => {
        this.setState({insertId: event.target.value});
    };

    handleChangePw = (event: any) => {
        this.setState({insertPw: event.target.value});
    };

    handleSubmit = (event: any) => {
        const {insertId, insertPw} = this.state;

        if (id === insertId && pw === insertPw) {
            sessionStorage.setItem("id", id);
            this.props.setId(id);
            this.props.closePopup();
        } else {
            alert("login failed:: " + insertId + '/' + insertPw);
        }
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="Login-popup">
                    <div className="Login-inner">
                        <p>Login <button onClick={this.props.closePopup}>close</button></p>
                        <label htmlFor="id">ID</label> <input type="text" id="id" value={this.state.insertId}
                                                              onChange={this.handleChangeId}/>
                        <label htmlFor="pw">PW</label> <input type="password" id="pw" value={this.state.insertPw}
                                                              onChange={this.handleChangePw}/>
                        <input type="submit" value="login"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;