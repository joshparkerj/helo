import React, { Component } from 'react';
import './form.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';
import { newPost } from '../../api';

class Form extends Component{

  constructor(){
    super();
    this.state = {
      title: '',
      content: '',
      imgurl: ''
    }
  }

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history);
    /*
    TODO: Find a way to redirect to login page when a user isn't logged in.
    That was the function of this code before the conversion to session.
    if (!this.props.user_id){
      this.props.history.push('/');
    }
    */

  }

  hc = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick = () => {
    newPost(
      this.state.title,
      this.state.content,
      this.state.imgurl)
      .then(r => {
        this.props.history.push('/dashboard');
      })
  }

  render(){
    return(
      <div className="form">
        form
        <br /><label>title</label><br />
        <input name="title" value={this.state.title} onChange={this.hc} />
        <br /><label>content</label><br />
        <input name="content" value={this.state.content} onChange={this.hc} />
        <br /><label>image url</label><br />
        <input name="imgurl" value={this.state.imgurl} onChange={this.hc} />
        <br /><button onClick={this.handleClick}>submit this new post</button>
      </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    path: state.path,
    duxHistory: state.history,
  }
}

const mapDispatchToProps = {
  setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
