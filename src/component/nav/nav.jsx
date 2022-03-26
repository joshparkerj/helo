import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import debug from 'debug';

import './nav.css';
import {
  postPic, getApiAuthMe, logout, getSession,
} from '../../api';
import { changePic, loginInfo } from '../../ducks/reducer';

const debugNav = debug('nav');

const Nav = function Nav({
  loginInfo: login,
  history,
  path,
  profile_pic: profilePic,
  username,
  updatePic,
  changePic: change,
  hc,
}) {
  useEffect(() => {
    getApiAuthMe()
      .then((r) => {
        if (r.data[0]) {
          login(
            r.data[0].username,
            r.data[0].profile_pic,
          );
        } else {
          login('', '');
        }
      })
      .catch((err) => {
        debugNav(err);
      });
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        login('', '');
        history.push('/');
      })
      .catch((err) => debugNav(err));
  };

  const handleSession = () => {
    getSession()
      .then((r) => {
        if (r.data.session.userid) {
          toast.success(`Logged in! User ID: ${r.data.session.userid}`);
        } else {
          toast.warn(`Not logged in! Session ID: ${r.data.sessionID}`);
        }
      });
  };

  if (path === '/') {
    return (
      <div className="none" />
    );
  }

  return (
    <div className="nav">
      <img src={profilePic} alt="profile pic" />
      <h4>{username}</h4>
      <button
        type="button"
        className="pic-button"
        onClick={() => postPic(updatePic)
          .then((r) => change(r))
          .catch((err) => debugNav(err))}
      >
        Change Profile Pic
      </button>
      <label htmlFor="update-pic">
        New Profile Pic URL
        <input
          name="updatePic"
          id="update-pic"
          value={updatePic}
          onChange={hc}
        />
      </label>
      <button type="button" onClick={() => history.push('/dashboard')}>
        <img src="/home_logo.png" alt="Home" />
      </button>
      <button type="button" onClick={() => history.push('/new')}>
        <img src="/new_logo.png" alt="New Post" />
      </button>
      <button type="button" onClick={handleLogout}>
        <img src="/shut_down.png" alt="Logout" />
      </button>
      <button type="button" onClick={handleSession}>
        <img src="/fuzzy_network.png" alt="Session" />
      </button>
    </div>
  );
};

Nav.propTypes = {
  loginInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  path: PropTypes.string,
  profile_pic: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updatePic: PropTypes.string.isRequired,
  changePic: PropTypes.func.isRequired,
  hc: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  history: null,
  path: '/',
};

const mapStateToProps = (state) => ({
  path: state.path,
  history: state.history,
  username: state.username,
  profile_pic: state.profile_pic,
});

const mapDispatchToProps = {
  changePic,
  loginInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
