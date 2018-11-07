import React, { Component } from 'react';
import './dashboard.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';
import { searchPosts } from '../../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      term: '',
      mine: true,
      posts: []
    }
  }

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history)
    if (!this.props.username){
      this.props.history.push('/');
    }
    this.sp();
  }

  hc = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  cb = e => {
    this.setState({mine: !this.state.mine});
  }

  sp = () => {
    searchPosts(this.state.mine,this.state.term)
      .then(r => {
        if (r && r.data){
          if (r.data.length > 0){
            this.setState({
              posts: r.data,
              term: ''
            });
          } else {
            toast.warn('your search turned up no results');
          }
        } else {
          toast.error('something went wrong');
        }
      })
  }

  postMapper = (e,i) => {
    return(
      <div className="post-wrapper" key={i}>
        <Link to={`/post/${e.post_id}`}>
          <div className="wrapped">
            <h3>{e.title}</h3>
          </div>
          <div className="wrapped">
            <h6>by {e.username}</h6>
            <img className="profile-pic" src={e.profile_pic} alt={e.username} />
          </div>
        </Link>
      </div>
    )
  }

  render(){
    return(
      <div className="dashboard">
        <div className="dashboard-search">
          <input
            className="search-bar"
            name="term"
            value={this.state.term}
            onChange={this.hc}
            placeholder="Search by Title" />
          <button onClick={this.sp}>
            <img src="/search_logo.png" alt="Search Posts" />
          </button>
          <label>My Posts:</label>
          <input
            className="my-posts"
            type="checkbox"
            name="mine"
            value={this.state.mine}
            checked={this.state.mine}
            onChange={this.cb} />
        </div>
        <div className="post-listing">
          {this.state.posts.map(this.postMapper)}
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    path: state.path,
    duxHistory: state.history,
    username: state.username
  }
}

const mapDispatchToProps = {
  setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
