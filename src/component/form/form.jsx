import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './form.css';
import { setPath } from '../../ducks/reducer';
import { newPost } from '../../api';

const Form = function Form({
  setPath: path, location, history, username,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgurl, setImgurl] = useState('');

  useEffect(() => {
    path(location?.pathname, history);
    if (!username) {
      history.push('/');
    }
  }, []);

  const handleClick = () => {
    newPost(
      title,
      content,
      imgurl,
    )
      .then(() => {
        history.push('/dashboard');
      });
  };

  return (
    <div className="form">
      <h3 className="heading">New Post</h3>
      <br />
      <label htmlFor="title">
        Title:
        <br />
        <input name="title" id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
      </label>
      <img
        className="form-image"
        src={imgurl}
        alt="Preview"
        onError={({ target }) => {
          // eslint-disable-next-line no-param-reassign
          target.src = '/no_image.jpg';
        }}
      />
      <br />
      <label htmlFor="imgurl">
        Image URL:
        <br />
        <input name="imgurl" id="imgurl" value={imgurl} onChange={({ target }) => setImgurl(target.value)} />
      </label>
      <br />
      <label htmlFor="content">
        Content:
        <br />
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </label>
      <br />
      <button type="submit" onClick={handleClick}>Post</button>
    </div>
  );
};

Form.propTypes = {
  setPath: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.path,
  duxHistory: state.history,
  username: state.username,
});

const mapDispatchToProps = {
  setPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
