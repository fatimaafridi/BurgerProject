import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/logout';
import * as actionCreater from './store/actions/index';
import asynComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asynComponent(() => {
  return import('./containers/checkout/checkout');
});

const asyncOrder = asynComponent(() => {
  return import('./containers/orders/orders');
});

const asyncAuth = asynComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  // state = {
  //   show: true
  // };
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />

          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actionCreater.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
