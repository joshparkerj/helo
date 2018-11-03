import React from 'react';
import './nav.css';
import { connect } from 'react-redux';
import { postPic } from '../../api';
import { changePic } from '../../ducks/reducer';

function Nav(props){
  console.log("this is the nav component");
  console.log(props);
  if (props.path === '/'){
    return(
      <div className="none"></div>
    )
  }
  return(
    <div className="nav">
      Nav bar stub
      <h4>username: {props.username}</h4>
      <img src={props.profile_pic} alt="profile pic" />
      <button
        onClick={() => {
        return postPic(props.updatePic,props.userid)
          .then(r => props.changePic(r))
          .catch(err => console.error(err))
        }
      }>
        Change Profile Pic
      </button>
      <label>New Profile Pic URL</label>
      <input name="updatePic" value={props.updatePic} onChange={props.hc} />
      <button onClick={() => props.history.push('/dashboard')}>Home</button>
      <button onClick={() => props.history.push('/new')}>New Post</button>
      <button onClick={() => props.history.push('/')}>Logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    path: state.path,
    history: state.history,
    username: state.username,
    profile_pic: state.profile_pic,
    userid: state.id
  }
}

const mapDispatchToProps = {
  changePic
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
