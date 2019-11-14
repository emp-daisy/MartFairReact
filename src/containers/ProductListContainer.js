import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import ProductList from '../components/ProductList';
import { getProducts, getProductByDepartment } from '../actions/product';
import Erroring from '../components/Erroring';


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
    const { totalCount } = this.props;
    if (totalCount > limit) this.props.getProducts({ limit });
  }

  onPageChange = (e, { activePage }) => this.props.getProducts({
    page: activePage, limit: this.props.numberPerPage,
  })

  render() {
    const {
      products, loading, error, errorMessage, numberPerPage, totalCount, currentPage,
    } = this.props;
    return (
      ((products && products.length > 0) || loading) ? (
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
      ) : <Erroring message="No Products found" />
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
