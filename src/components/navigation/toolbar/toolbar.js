import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle';
const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>
      <DrawerToggle clicked={props.drawerToggleClicked} />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
