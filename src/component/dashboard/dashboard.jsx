import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './dashboard.css';
import { setPath } from '../../ducks/reducer';
import { searchPosts } from '../../api';

const Dashboard = function Dashboard({
  setPath: path, location, history, username,
}) {
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mine, setMine] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    path(location.pathname, history);
    if (!username) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    searchPosts(mine, searchTerm)
      .then((r) => {
        if (r && r.data) {
          if (r.data.length > 0) {
            setPosts(r.data);
            setTerm('');
          } else {
            toast.warn('your search turned up no results');
          }
        } else {
          toast.error('something went wrong');
        }
      });
  }, [searchTerm]);

  const postMapper = (e, i) => (
    <div className="post-wrapper" key={i}>
      <Link to={`/post/${e.post_id}`}>
        <div className="wrapped">
          <h3>{e.title}</h3>
        </div>
        <div className="wrapped">
          <h6>
            by
            {e.username}
          </h6>
          <img className="profile-pic" src={e.profile_pic} alt={e.username} />
        </div>
      </Link>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-search">
        <input
          className="search-bar"
          name="term"
          value={term}
          onChange={({ target }) => setTerm(target.value)}
          placeholder="Search by Title"
        />
        <button type="submit" onClick={() => setSearchTerm(term)}>
          <img src="/search_logo.png" alt="Search Posts" />
        </button>
        <label htmlFor="my-posts">
          My Posts:
          <input
            className="my-posts"
            id="my-posts"
            type="checkbox"
            name="mine"
            value={mine}
            checked={mine}
            onChange={setMine(!mine)}
          />
        </label>
      </div>
      <div className="post-listing">
        {posts.map(postMapper)}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
