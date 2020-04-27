import React, { Component } from 'react';
import Aux from '../Auxilliary/Auxilliary';
import classes from './layout.module.css';
import { connect } from 'react-redux';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, null)(Layout);
