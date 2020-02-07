import React from 'react';
import logo from '../resource/logo.svg';
import '../css/Home.css';
import Login from './Login-popup';
import { Button, Segment } from 'semantic-ui-react'

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      checkLogin: window.sessionStorage.getItem("id")
    };
  }

  togglePopup() {
    if(this.state.checkLogin === null){
      this.setState({
        showPopup: !this.state.showPopup
      });
    }else {
      window.sessionStorage.clear();
      this.setState({
        showPopup: false,
        checkLogin: ''
      });
    }

  }

  render(){
    return(
        <div className="Home">
          <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <p>
              TEST: CREATE REACT APP ..
            </p>
           
            <Segment inverted>
              <Button inverted color='teal' onClick={this.togglePopup.bind(this)}>
                {this.state.checkLogin === null ? "Sign In" : "Sign Out" }
              </Button>
            </Segment>
            
            {this.state.showPopup ?
              <Login
                text='close'
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }

          </header>
        </div>
    );
  }
}

export default Home;
