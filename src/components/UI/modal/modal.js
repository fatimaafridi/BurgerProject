import React, { Component } from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../backdrop/backdrop';
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ) {
      return true;
    } else return false;
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
