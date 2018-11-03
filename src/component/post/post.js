import React, { Component } from 'react';
import './post.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';

class Post extends Component {

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history)
  }

  render(){
    return(
      <div className="post">
        post
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
