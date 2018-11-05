import React, { Component } from 'react';
import './nav.css';
import { connect } from 'react-redux';
import { postPic, getApiAuthMe, logout, getSession } from '../../api';
import { changePic, loginInfo } from '../../ducks/reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Nav extends Component {

  componentDidMount(){
    getApiAuthMe()
      .then(r => {
        if(r.data[0]){
          this.props.loginInfo(
            r.data[0].username,
            r.data[0].profile_pic)  
        } else {
          this.props.loginInfo('','');
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleLogout = () => {
    logout()
      .then(r => {
        this.props.loginInfo('','');
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  handleSession = () => {
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
    if (this.props.path === '/'){
      return(
        <div className="none"></div>
      )
    }
    return(
      <div className="nav">
        <ToastContainer />
        <img src={this.props.profile_pic} alt="profile pic" />
        <h4>{this.props.username}</h4>
        <button
          onClick={() => {
          return postPic(this.props.updatePic)
            .then(r => this.props.changePic(r))
            .catch(err => console.error(err))
          }
        }>
          Change Profile Pic
        </button>
        <label>New Profile Pic URL</label>
        <input
          name="updatePic"
          value={this.props.updatePic}
          onChange={this.props.hc} />
        <button onClick={() => this.props.history.push('/dashboard')}>
          Home
        </button>
        <button onClick={() => this.props.history.push('/new')}>
          New Post
        </button>
        <button onClick={this.handleLogout}>
          Logout
        </button>
        <button onClick={this.handleSession}>
          Session
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    path: state.path,
    history: state.history,
    username: state.username,
    profile_pic: state.profile_pic,
  }
}

const mapDispatchToProps = {
  changePic,
  loginInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
