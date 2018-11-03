import React, { Component } from 'react';
import './form.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';

class Form extends Component{

  componentDidMount(){
    this.props.setPath(this.props.location.pathname,this.props.history)
  }

  render(){
    return(
      <div className="form">
        form
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
