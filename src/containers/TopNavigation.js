import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { searchProducts } from '../actions/product';
import { getDepartments } from '../actions/department';
import { logOutCustomer } from '../actions/customer';
import NavBar from '../components/NavBar';
import { getCartProducts } from '../actions/cart';
import { ADD_TO_CART_RESET } from '../action_types';

class TopNavigation extends Component {
  componentDidMount() {
    this.props.getDepartments();
    this.props.getCartProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addCartDone !== this.props.addCartDone && this.props.addCartDone) {
      toast(
        {
          title: 'Cart',
          description: <p>Item added to cart!</p>,
          type: 'success',
          time: 3000,
          size: 'mini',
          color: 'green',
          icon: 'cart',
        },
      );
      setTimeout(() => this.props.cardUpdated(), 100);
    }
  }

  onSearchChange = (query_string) => {
    this.props.searchProducts({ query_string });
  }

  onResultSelect = ({ product_id }) => {
    this.props.history.push(`/catalog/${product_id}`);
  }

  onDepartmentClick = (department_id) => {
    this.props.history.push(`/catalog/?d=${department_id}`);
  }

  render() {
    const {
      searchLoading, searchResult, children,
      allDepartment, loggedIn, cartProducts,
      history: { location: { pathname } },
    } = this.props;
    return (
      <NavBar
        isLoading={searchLoading}
        searchResult={searchResult}
        onResultSelect={this.onResultSelect}
        onSearchChange={this.onSearchChange}
        onDepartmentClick={this.onDepartmentClick}
        departments={allDepartment}
        onLogOut={this.props.logOutCustomer}
        loggedIn={loggedIn}
        pathname={pathname}
        cartSize={cartProducts ? cartProducts.length : 0}
      >
        {children}
        <SemanticToastContainer className="container" position="top-center" />
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.product.searchProducts,
  searchLoading: state.product.searchLoading,
  allDepartment: state.department.allDepartment,
  loggedIn: state.customer.loggedIn,
  cartLoading: state.cart.cartLoading,
  addCartDone: state.cart.addCartDone,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchProducts,
  getDepartments,
  logOutCustomer,
  getCartProducts,
  cardUpdated: () => dispatch({ type: ADD_TO_CART_RESET }),
}, dispatch);

const TopNavigationWithRouter = withRouter(TopNavigation);

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigationWithRouter);
