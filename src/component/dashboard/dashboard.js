import React, { Component } from 'react';
import './dashboard.css';
import { connect } from 'react-redux';
import { setPath } from '../../ducks/reducer';

class Dashboard extends Component {

  componentDidMount(){
    console.log('dashboard has mounted');
    console.log(this.props);
    this.props.setPath(this.props.location.pathname,this.props.history)
  }

  render(){
    return(
      <div className="dashboard">
        dashboard
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
