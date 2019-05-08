import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import ProductList from '../components/ProductList';
import { searchProducts } from '../actions/product';

class CatalogSearch extends Component {
  state = {};

  componentDidMount() {
    const { q, page, limit } = queryString.parse(this.props.location.search);
    this.props.searchProducts({ queryString: q, page, limit });
  }

  onLimitChange = (limit) => {
    const { q } = queryString.parse(this.props.location.search);
    this.props.searchProducts({ limit, queryString: q });
  }

  onPageChange = (e, { activePage }) => {
    const { q } = queryString.parse(this.props.location.search);
    this.props.searchProducts({ page: activePage, queryString: q });
  }

  render() {
    const {
      products, loading, error, errorMessage, numberPerPage, totalCount, currentPage,
    } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.searchProducts,
  loading: state.product.searchLoading,
  error: state.product.error,
  errorMessage: state.product.errorMessage,
  numberPerPage: state.product.pageLimit,
  currentPage: state.product.currentPage,
  totalCount: state.product.productCount,
});

const mapDispatchToProps = dispatch => bindActionCreators({ searchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatalogSearch);
