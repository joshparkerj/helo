import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import debug from 'debug';

import './auth.css';
import { setPath, loginInfo } from '../../ducks/reducer';
import {
  postRegistration,
  postLogin,
  getSession,
  checkUsername,
} from '../../api';

const debugAuth = debug('auth');

const Auth = function Auth({
  setPath: path, location, history, loginInfo: login,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    path(location?.pathname, history);
  }, []);

  const handleLogin = () => {
    postLogin(username, password)
      .then((r) => {
        if (r) {
          login(
            r.data[0].username,
            r.data[0].profile_pic,
          );
          history.push('/dashboard');
        } else {
          toast.error("can't log you in! check username and password");
        }
      })
      .catch((err) => {
        debugAuth(err);
      });
  };

  const register = () => {
    checkUsername(username)
      .then((checkUsernameResponse) => {
        if (!(checkUsernameResponse.data[0])) {
          postRegistration(username, password)
            .then((postRegistrationResponse) => {
              login(
                postRegistrationResponse.data[0].username,
                postRegistrationResponse.data[0].profile_pic,
              );
              history.push('/dashboard');
            })
            .catch((err) => {
              debugAuth(err);
            });
        } else {
          toast.error('username not available!');
        }
      });
  };

  const session = () => {
    getSession()
      .then((r) => {
        if (r.data.session.userid) {
          toast.success(`Logged in! User ID: ${r.data.session.userid}`);
        } else {
          toast.warn(`Not logged in! Session ID: ${r.data.sessionID}`);
        }
      });
  };

  return (
    <div className="auth">
      <img src="/helo_logo.png" alt="Helo" />
      <h4>Helo</h4>
      <div className="auth-inputs">
        <label htmlFor="username">
          Username:
          <input
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <div className="auth-buttons">
        <button type="button" onClick={handleLogin}>login</button>
        <button type="button" onClick={register}>register</button>
        <button type="button" onClick={session}>see current session data</button>
      </div>
    </div>
  );
};

Auth.propTypes = {
  setPath: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.path,
  duxHistory: state.history,
});

const mapDispatchToProps = {
  setPath,
  loginInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
