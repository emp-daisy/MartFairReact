import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import ProductList from '../components/ProductList';
import { getProducts, getProductByDepartment } from '../actions/product';
import Page404 from '../components/Page404';


class ProductListContainer extends Component {
  state = {};

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const { search } = { ...this.props.location };

    if (search && search !== prevProps.location.search) {
      this.getProducts();
    }
  }

  getProducts = () => {
    const { search } = { ...this.props.location };
    const { d: department, page, limit } = { ...queryString.parse(search) };
    if (department) {
      this.props.getProductByDepartment({ id: department, page, limit });
    } else {
      this.props.getProducts({ page, limit });
    }
  }

  onLimitChange = (limit) => {
    this.props.getProducts({ limit });
  }

  onPageChange = (e, { activePage }) => this.props.getProducts({ page: activePage })

  render() {
    const {
      products, loading, error, errorMessage, numberPerPage, totalCount, currentPage,
    } = this.props;
    return (
      (products && products.length > 0) ? (
        <ProductList
          products={products}
          loading={loading}
          error={error}
          errorMessage={errorMessage}
          totalCount={totalCount}
          currentPage={currentPage}
          numberPerPage={numberPerPage}
          onLimitChange={this.onLimitChange}
          onPageChange={this.onPageChange}
        />
      ) : <Page404 message="Products not found" />
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.allProducts,
  loading: state.product.loading,
  error: state.product.error,
  errorMessage: state.product.errorMessage,
  numberPerPage: state.product.pageLimit,
  currentPage: state.product.currentPage,
  totalCount: state.product.productCount,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  getProductByDepartment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);