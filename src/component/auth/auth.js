import React, { Component } from 'react';
import './auth.css';
import { connect } from 'react-redux';
import { setPath, loginInfo } from '../../ducks/reducer';
import { postRegistration, postLogin, getSession } from '../../api';

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
        console.log(r.data);
        this.props.loginInfo(
          r.data[0].username,
          r.data[0].profile_pic)
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.error(err);
      })
  }

  register = () => {
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
  }

  session = () => {
    getSession()
      .then(r => {
        console.log(r.data);
      })
  }

  render(){
    return(
      <div className="auth">
        <h4>auth</h4>
        <ul>
          <li>
            <label>username</label>
          </li>
          <li>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange} />
          </li>
          <li>
            <label>password</label>
          </li>
          <li>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange} />
          </li>
          <li>
            <button onClick={this.login}>login</button>
          </li>
          <li>
            <button onClick={this.register}>register</button>
          </li>
          <li>
            <button onClick={this.session}>see current session data</button>
          </li>
        </ul>
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
