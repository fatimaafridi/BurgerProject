import React, { Component } from 'react';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import classes from './auth.module.css';
import { connect } from 'react-redux';
import * as actionCreater from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';
import { Redirect } from 'react-router-dom';
import { updatedObject } from '../../shared/utility';

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: ''
      }
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updatedObject(this.state.controls, {
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    });
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreater.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () =>
      dispatch(actionCreater.setAuthRedirectPath('/'))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
