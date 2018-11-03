import React from 'react';
import './nav.css';
import { connect } from 'react-redux';

function Nav(props){
  if (props.path === '/'){
    return(
      <div className="none"></div>
    )
  }
  return(
    <div className="nav">
      Nav bar stub
      <button onClick={() => props.history.push('/dashboard')}>Home</button>
      <button onClick={() => props.history.push('/new')}>New Post</button>
      <button onClick={() => props.history.push('/')}>Logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    path: state.path,
    history: state.history
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
