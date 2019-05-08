import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/product';
import { getDepartments } from '../actions/department';
import { logOutCustomer } from '../actions/customer';
import NavBar from '../components/NavBar';
import { getCartProducts } from '../actions/cart';

class TopNavigation extends Component {
  componentDidMount() {
    this.props.getDepartments();
    this.props.getCartProducts();
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
      isLoading, searchResult, children,
      allDepartment, loggedIn, cartProducts,
      history: { location: { pathname } },
    } = this.props;
    return (
      <NavBar
        isLoading={isLoading}
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
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.product.searchProducts,
  isLoading: state.product.searchLoading,
  allDepartment: state.department.allDepartment,
  loggedIn: state.customer.loggedIn,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchProducts,
  getDepartments,
  logOutCustomer,
  getCartProducts,
}, dispatch);

const TopNavigationWithRouter = withRouter(TopNavigation);

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigationWithRouter);
