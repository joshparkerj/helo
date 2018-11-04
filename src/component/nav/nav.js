import React, { Component } from 'react';
import './nav.css';
import { connect } from 'react-redux';
import { postPic, getApiAuthMe } from '../../api';
import { changePic, loginInfo } from '../../ducks/reducer';

class Nav extends Component {

  componentDidMount(){
    getApiAuthMe()
      .then(r => {
        this.props.loginInfo(
          r.data[0].username,
          r.data[0].profile_pic)
      })
      .catch(err => {
        console.error(err);
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
        Nav bar stub
        <h4>username: {this.props.username}</h4>
        <img src={this.props.profile_pic} alt="profile pic" />
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
        <button onClick={() => this.props.history.push('/')}>
          Logout
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
