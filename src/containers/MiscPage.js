import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getProduct, getProducts, getProductReview, getRelatedProduct,
} from '../actions/product';
import { getAttributesForProduct } from '../actions/attribute';
import { addToCart, addToWishlist, removeProductFromCart } from '../actions/cart';
import Erroring from '../components/Erroring';
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';
import Misc from '../components/Misc';

class MiscPage extends Component {
  state = {};

  render() {
    const { pathname } = this.props.history.location;
    return (
      <React.Fragment>
        {(() => {
          switch (pathname) {
            case '/privacy':
              return <Privacy />;
            case '/terns-and-conditions':
              return <Terms />;
            case '/help':
            case '/faq':
              return <Misc />;
            case '/shipping':
              return <Misc index={1} />;
            case '/returns':
              return <Misc index={2} />;
            case '/tracking':
              return <Misc index={3} />;
            default:
              return <Erroring message="Seems you lost your way" icon="exclamation triangle" />;
          }
        })()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.product.loading,
  product: state.product.productInfo,
  relatedProducts: state.product.relatedProducts,
  loadingRelated: state.product.relatedLoading,
  loadingAttributes: state.attribute.loading,
  attributes: state.attribute.attributeInfo || [],
  reviews: state.product.productReviews,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProduct,
  getProducts,
  getAttributesForProduct,
  getProductReview,
  getRelatedProduct,
  addToCart,
  addToWishlist,
  removeProductFromCart,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MiscPage);
