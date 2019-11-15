import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Menu, Container, Grid, Segment,
} from 'semantic-ui-react';
import { getWishlist, moveToCart } from '../actions/cart';
import {
  getCustomer, updateCustomerCard, updateCustomerDetails, updateCustomerAddress,
} from '../actions/customer';
import { getShippings } from '../actions/shipping';
import { getCustomerOrders, getOrder } from '../actions/order';
import Erroring from '../components/Erroring';
import WishList from '../components/Wishlist';
import Orders from '../components/Orders';
import Customer from '../components/Customer';

class ProfilePage extends Component {
  state = {
    activeOrderId: -1,
    creditCard: '',
    activeModal: null,
  };

  componentDidMount=() => {
    this.getMenuItems();
    this.props.getShippings();
  }

  componentDidUpdate = (prevProps) => {
    const { customerInfo, location: { pathname } } = this.props;
    const { pathname: prevPathname } = prevProps.location;

    if (customerInfo !== prevProps.customerInfo) {
      this.handleModalClose();
    }
    if (pathname !== prevPathname) {
      switch (pathname) {
        case '/account':
          this.props.getCustomer();
          break;
        case '/orders':
          this.props.getCustomerOrders();
          break;
        case '/wishlist':
          this.props.getWishlist();
          break;
        default:
          this.props.getCustomer();
          break;
      }
    }
  }

  handleModalOpen = activeModal => this.setState({ activeModal })

  handleModalClose = () => this.setState({ activeModal: null })

  handleItemClick = (_e, { name }) => this.props.history.push(`/${name}`)

  handleOrderClick = (_e, { order_id }) => {
    this.props.getOrder(order_id);
    const { activeOrderId: activeOrder } = this.state;
    this.setState({ activeOrderId: activeOrder === order_id ? -1 : order_id });
  }

  getMenuView = () => {
    const { pathname } = this.props.history.location;
    const {
      wishlistProducts, wishlistLoading, customerOrders, customerOrderInfo,
      customerInfo = {}, customerLoading, customerOrdersloading, customerSaveLoading,
    } = this.props;
    const {
      activeOrderId, activeModal, creditCard, shippingRegion, customerAddress, customerDetails,
    } = this.state;
    switch (pathname) {
      case '/account':
        return (
          <Customer
            activeModal={activeModal}
            customerInfo={customerInfo}
            customerAddress={customerAddress}
            customerDetails={customerDetails}
            loading={customerLoading}
            creditCard={creditCard}
            shippingRegion={shippingRegion}
            saveLoading={customerSaveLoading}
            handleChange={(name, value) => this.setState({ [name]: value })}
            handleModalClose={this.handleModalClose}
            handleModalOpen={this.handleModalOpen}
            updateCustomerDetails={this.props.updateCustomerDetails}
            updateCustomerCard={this.props.updateCustomerCard}
            updateCustomerAddress={this.props.updateCustomerAddress}
          />
        );
      case '/orders':
        return (
          <Orders
            customerOrders={customerOrders}
            customerOrderInfo={customerOrderInfo}
            activeOrderId={activeOrderId}
            loading={customerOrdersloading}
            handleClick={this.handleOrderClick}
          />
        );
      case '/wishlist':
        return (
          <WishList
            wishlistProducts={wishlistProducts}
            loading={wishlistLoading}
            moveToCart={this.props.moveToCart}
          />
        );
      default:
        return <Erroring message="Seems you lost your way" icon="exclamation triangle" />;
    }
  }

  getMenuItems = () => {
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case '/account':
        this.props.getCustomer();
        break;
      case '/orders':
        this.props.getCustomerOrders();
        break;
      case '/wishlist':
        this.props.getWishlist();
        break;
      default:
        this.props.getCustomer();
        break;
    }
  };

  render() {
    if (!this.props.loggedIn) this.props.history.replace('/');
    const { pathname } = this.props.history.location;
    return (
      <Container style={{ padding: '30px 0' }}>
        <Grid colums={2}>
          <Grid.Column tablet={4} mobile={5} computer={4}>
            <Menu fluid vertical>
              <Menu.Item
                name="account"
                active={pathname === '/account'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="orders"
                active={pathname === '/orders'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="wishlist"
                active={pathname === '/wishlist'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched tablet={12} mobile={11} computer={11}>
            <Segment>
              {this.getMenuView()}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  wishlistProducts: state.cart.wishlistProducts,
  wishlistLoading: state.cart.wishlistLoading,
  customerOrdersloading: state.order.customerOrdersloading,
  customerOrders: state.order.customerOrders,
  customerOrderInfo: state.order.customerOrderInfo,
  customerInfo: state.customer.customerInfo,
  loading: state.customer.loading,
  customerLoading: state.customer.customerLoading,
  customerSaveLoading: state.customer.customerSaveLoading,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getWishlist,
  getCustomer,
  getCustomerOrders,
  moveToCart,
  getOrder,
  getShippings,
  updateCustomerCard,
  updateCustomerDetails,
  updateCustomerAddress,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
