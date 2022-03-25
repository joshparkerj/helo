import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './post.css';
import { setPath } from '../../ducks/reducer';
import { getPost } from '../../api';

const Post = function Post({
  setPath: path, location, history, match,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    path(location.pathname, history);
    getPost(match.params.postid)
      .then((r) => {
        setTitle(r.data[0].title);
        setContent(r.data[0].content);
        setImgUrl(r.data[0].img_url);
        setUsername(r.data[0].username);
        setProfilePic(r.data[0].profile_pic);
      });
  }, []);

  return (
    <div className="post">
      <h3 className="heading">{title}</h3>
      <p>{content}</p>
      <img src={imgUrl} alt={title} />
      <h6>
        Author:
        {username}
      </h6>
      <img className="profile-pic" src={profilePic} alt={username} />
    </div>
  );
};

Post.propTypes = {
  setPath: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postid: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  path: state.path,
  duxHistory: state.history,
});

const mapDispatchToProps = {
  setPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
