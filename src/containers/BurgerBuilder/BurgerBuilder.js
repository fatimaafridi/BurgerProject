import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false
  };
  componentDidMount() {
    //console.log(this.props);
    this.props.onIngredientInit();
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actionCreator.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actionCreator.removeIngredient(ingName)),
    onIngredientInit: () => dispatch(actionCreator.initIngredients()),
    onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
    onSetRedirectPath: path => dispatch(actionCreator.setAuthRedirectPath(path))
  };
};
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
