import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
} from 'semantic-ui-react';
import {
  getCartProducts,
  updateProductQuantity,
  removeProductFromCart,
  totalAmount,
  addToWishlist,
} from '../actions/cart';
import Checkout from '../components/Checkout';

class CheckoutPage extends Component {
  componentDidMount() {
    this.props.getCartProducts();
    this.props.totalAmount();
  }

  componentDidUpdate(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.props.totalAmount();
    }
  }

  updateProductQuantity = (item_id, quantity) => {
    this.props.updateProductQuantity(item_id, quantity);
  };

  removeItem = (event, item_id) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.removeProductFromCart(item_id);
  };

  render() {
    if (!this.props.loggedIn) this.props.history.push('/login');
    return (
      <Container textAlign="center">
        <Checkout />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.cartProducts,
  totalCost: state.cart.totalAmount,
  cartLoading: state.cart.cartLoading,
  totalLoading: state.cart.totalLoading,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCartProducts,
    updateProductQuantity,
    removeProductFromCart,
    totalAmount,
    addToWishlist,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPage);
