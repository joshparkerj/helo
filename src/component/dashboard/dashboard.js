import React, { Component } from 'react';
import './dashboard.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';
import { searchPosts } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
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
        <ToastContainer />
        dashboard
        <label>search term:</label><br />
        <input name="term" value={this.state.term} onChange={this.hc} /><br />
        <label>My Posts:</label>
        <input
          type="checkbox"
          name="mine"
          value={this.state.mine}
          checked={this.state.mine}
          onChange={this.cb} />
        <button onClick={this.sp}>Search Posts</button>
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
