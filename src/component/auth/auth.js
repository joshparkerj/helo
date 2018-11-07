import React, { Component } from 'react';
import './auth.css';
import { connect } from 'react-redux';
import { setPath, loginInfo } from '../../ducks/reducer';
import {
  postRegistration,
  postLogin,
  getSession,
  checkUsername } from '../../api';
import { toast } from 'react-toastify';

class Auth extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history);
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  login = () => {
    postLogin(this.state.username,this.state.password)
      .then(r => {
        if(r){
          this.props.loginInfo(
            r.data[0].username,
            r.data[0].profile_pic)
          this.props.history.push('/dashboard');
        } else {
          toast.error("can't log you in! check username and password");
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  register = () => {
    checkUsername(this.state.username)
      .then(r => {
        if(!(r.data[0])){
          postRegistration(this.state.username,this.state.password)
          .then(r => {
            this.props.loginInfo(
              r.data[0].username,
              r.data[0].profile_pic)
            this.props.history.push('/dashboard');
          })
          .catch(err => {
            console.error(err);
          })
        } else {
          toast.error('username not available!');
        }
      })
  }

  session = () => {
    getSession()
      .then(r => {
        if (r.data.session.userid){
          toast.success(`Logged in! User ID: ${r.data.session.userid}`);
        } else {
          toast.warn(`Not logged in! Session ID: ${r.data.sessionID}`);
        }
      })
  }

  render(){
    return(
      <div className="auth">
        <img src="/helo_logo.png" alt="Helo" />
        <h4>Helo</h4>
        <div className="auth-inputs">
          <label>Username:</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange} />
          <label>Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange} />
        </div>
        <div className="auth-buttons">
          <button onClick={this.login}>login</button>
          <button onClick={this.register}>register</button>
          <button onClick={this.session}>see current session data</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    path: state.path,
    duxHistory: state.history
  }
}

const mapDispatchToProps = {
  setPath,
  loginInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
