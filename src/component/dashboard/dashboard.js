import React, { Component } from 'react';
import './dashboard.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';
import { searchPosts } from '../../api';

class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      term: '',
      mine: false,
      posts: []
    }
  }

  componentDidMount(){
    console.log('dashboard has mounted');
    console.log(this.props);
    this.props.setPath(this.props.location.pathname,this.props.history)
  }

  hc = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  cb = e => {
    this.setState({mine: !this.state.mine});
  }

  sp = () => {
    searchPosts(this.state.mine,this.state.term,this.props.myid)
      .then(r => {
        this.setState({posts: r.data})
      })
  }

  postMapper = (e,i) => {
    return(
      <div className="post-wrapper" key={i}>
        <h3>{e.title}</h3>
        <p>{e.content}</p>
        <img src={e.img_url} alt={e.title} />
      </div>
    )
  }

  render(){
    return(
      <div className="dashboard">
        dashboard
        <label>search term:</label><br />
        <input name="term" value={this.state.term} onChange={this.hc} /><br />
        <label>My Posts:</label>
        <input
          type="checkbox"
          name="mine"
          value={this.state.mine}
          onChange={this.cb} />
        <button onClick={this.sp}>Search Posts</button>
        {this.state.posts.map(this.postMapper)}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    path: state.path,
    duxHistory: state.history,
    myid: state.id
  }
}

const mapDispatchToProps = {
  setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
