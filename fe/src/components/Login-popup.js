import React from 'react';
import '../css/Login-popup.css';


export class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: "test",
			pw: "123",
			xid: "",
			xpw: "",
			logged: false
		}
	}

	onLogin = () => {
		this.setState({
			logged: true
		});
	}

	onLogout = () => {
		this.setState({
			logged: false,
			xid: '',
			xpw: ''
		});

		window.sessionStorage.clear();
	}

	handleChangeId = (event) => {
		this.setState({xid: event.target.value});
	}

	handleChangePw = (event) => {
		this.setState({xpw: event.target.value});
	}

	handleSubmit = (event) => {
		if(this.state.id === this.state.xid && this.state.pw === this.state.xpw){
			window.sessionStorage.setItem('id', this.state.xid);
			this.onLogin();
			this.props.closePopup();

			alert("login");
		}else{
			alert("login failed."+ this.state.xid + ' ' + this.state.xpw);
			this.onLogout();
		}
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			<div className="Login-popup">
				<div className="Login-inner">
					<p>Login <button onClick={this.props.closePopup}>close</button></p>
					<label htmlFor="id">ID</label> <input type="text" id="id" value={this.state.xid} onChange={this.handleChangeId}/>
					<label htmlFor="pw">PW</label> <input type="password" id="pw" value={this.state.xpw} onChange={this.handleChangePw}/>
					<input type="submit" value="login" />
				</div>
			</div>
			</form>
		);
	}
}

export default Login;