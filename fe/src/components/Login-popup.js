import React from 'react';
import '../css/Login-popup.css';

const id='test';
const pw='123';

export class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			xid: "",
			xpw: ""
		}
	}

	handleChangeId = (event) => {
		this.setState({xid: event.target.value});
	}

	handleChangePw = (event) => {
		this.setState({xpw: event.target.value});
	}

	handleSubmit = (event) => {
		const {xid, xpw} = this.state;
		if(id === xid && pw === xpw){
			sessionStorage.setItem("id", id);
			this.props.setId(id);
			this.props.closePopup();
		}else{
			alert("login failed:: "+ xid + '/' + xpw);
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