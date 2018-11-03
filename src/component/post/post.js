import React, { Component } from 'react';
import './post.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';
import { getPost } from '../../api';

class Post extends Component {

  constructor(){
    super();
    this.state = {
      post_id: null,
      title: '',
      content: '',
      img_url: '',
      username: '',
      profile_pic: ''
    }
  }

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history)
    console.log("imma bouta tryan get post ...");
    console.log(this.props.match.params.postid);
    getPost(this.props.match.params.postid)
      .then(r => {
        console.log('response received');
        console.log(r);
        console.log(r.data);
        this.setState({
          post_id: r.data[0].post_id,
          title: r.data[0].title,
          content: r.data[0].content,
          img_url: r.data[0].img_url,
          username: r.data[0].username,
          profile_pic: r.data[0].profile_pic
        })
      })
  }

  render(){
    return(
      <div className="post">
        post
        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
        <img src={this.state.img_url} alt={this.state.title} />
        <h6>Author: {this.state.username}</h6>
        <img src={this.state.profile_pic} alt={this.state.username} />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    path: state.path,
    duxHistory: state.history
  }
}

const mapDispatchToProps = {
  setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
