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
import { createOrders } from '../actions/order';
import { getShippings, getShippingRegions } from '../actions/shipping';
import { getCustomer } from '../actions/customer';
import Checkout from '../components/Checkout';
import PageLoader from '../components/placeholders/PageLoader';

class CheckoutPage extends Component {
  state = {
    loading: true,
    shippingAddress: {
      name: '',
      address_1: '',
      address_2: '',
      city: '',
      postal_code: '',
      country: '',
      shipping_region_id: '',
    },
    billingAddress: {
      name: '',
      address_1: '',
      address_2: '',
      city: '',
      postal_code: '',
      country: '',
    },
    sameAddress: false,
    deliveryMode: {},
  }

  componentDidMount() {
    this.props.getCartProducts();
    this.props.totalAmount();
    this.props.getShippings();
    this.props.getShippingRegions();
    this.props.getCustomer();
  }

  componentDidUpdate(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.props.totalAmount();
    }
    if (this.props.customerInfo !== nextProps.customerInfo) {
      this.setDefaultAddress();
    }
    if (this.props.cartLoading !== nextProps.cartLoading) {
      this.setProductsStatus();
    }
  }

  setProductsStatus = () => this.setState({ loading: this.props.cartLoading });

  updateProductQuantity = (item_id, quantity) => {
    this.props.updateProductQuantity(item_id, quantity);
  };

  removeItem = (event, item_id) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.removeProductFromCart(item_id);
  };

  syncAddress = () => {
    this.setState(state => ({
      sameAddress: !state.sameAddress, billingAddress: state.shippingAddress,
    }));
  }

  setDefaultAddress = () => {
    this.setState({
      shippingAddress: this.props.customerInfo,
      sameAddress: false,
    });
  }

  setDeliveryMode = deliveryMode => this.setState({ deliveryMode })

  handleDeliveryAddress = (name, value) => {
    this.setState(state => ({
      shippingAddress: {
        ...state.shippingAddress,
        [name]: value,
      },
      ...(name === 'shipping_region_id' ? { deliveryMode: {} } : {}),
    }));
  }

  handleBillingAddress = (name, value) => {
    this.setState(state => ({ billingAddress: { ...state.billingAddress, [name]: value } }));
  }

  render() {
    const {
      cartLoading, loggedIn, products, allShipping,
      shippingRegion, customerInfo, totalCost, createOrders: newOrders,
      orderLoading, paymentLoading, paymentSuccess,
      paymentError, paymentErrorMessage, orderError, orderErrorMessage,
    } = this.props;
    const {
      loading, billingAddress, shippingAddress, sameAddress,
      deliveryMode,
    } = this.state;
    if (!loggedIn) this.props.history.push('/login');
    if (!loading && products.length < 1) this.props.history.push('/cart');
    return (
      <Container textAlign="center">
        { cartLoading ? <PageLoader /> : (
          <Checkout
            addressOption={allShipping}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            sameAddress={sameAddress}
            syncAddress={this.syncAddress}
            onDeliveryAddressChange={this.handleDeliveryAddress}
            onBillingAddressChange={this.handleBillingAddress}
            customerInfo={customerInfo}
            shippingRegion={shippingRegion}
            shippingOption={deliveryMode}
            handleShippingOption={this.setDeliveryMode}
            products={products}
            subTotal={totalCost}
            grandTotal={totalCost + (deliveryMode.shipping_cost || 0)}
            onPayment={newOrders}
            orderLoading={orderLoading}
            paymentLoading={paymentLoading}
            paymentSuccess={paymentSuccess}
            paymentError={paymentError}
            paymentErrorMessage={paymentErrorMessage}
            orderError={orderError}
            orderErrorMessage={orderErrorMessage}

          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.cartProducts,
  totalCost: state.cart.totalAmount,
  cartLoading: state.cart.cartLoading,
  totalLoading: state.cart.totalLoading,
  orderLoading: state.order.createLoading,
  paymentLoading: state.payment.loading,
  allShipping: state.shipping.allShipping,
  shippingRegion: state.shipping.allShippingRegions,
  loggedIn: state.customer.loggedIn,
  customerInfo: state.customer.customerInfo,
  paymentSuccess: state.payment.success,
  paymentError: state.payment.error,
  paymentErrorMessage: state.payment.errorMessage,
  orderError: state.order.error,
  orderErrorMessage: state.order.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCartProducts,
    updateProductQuantity,
    removeProductFromCart,
    totalAmount,
    addToWishlist,
    getShippings,
    getShippingRegions,
    getCustomer,
    createOrders,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPage);
