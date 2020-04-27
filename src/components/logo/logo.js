import React from 'react';
import classes from './logo.module.css';
import burgerLogo from '../../assets/images/27.1 burger-logo.png.png';

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
