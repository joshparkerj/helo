import React, { Component } from 'react';
import './auth.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';

class Auth extends Component {

  componentDidMount(){
    console.log("auth component just mounted");
    console.log(this.props.location.pathname);
    this.props.setPath(this.props.location.pathname,this.props.history);
  }

  render(){
    return(
      <div className="auth">
        auth
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
