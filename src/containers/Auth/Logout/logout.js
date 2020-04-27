import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/actions/index';

export class logout extends Component {
  componentDidMount() {
    this.props.onLogOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actionCreator.logOut());
    }
  };
};
export default connect(null, mapDispatchToProps)(logout);
