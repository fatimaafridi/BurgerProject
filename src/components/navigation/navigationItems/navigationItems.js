import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    {!props.isAuthenticated ? null : (
      <NavigationItem link="/orders">Orders</NavigationItem>
    )}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Auth</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
