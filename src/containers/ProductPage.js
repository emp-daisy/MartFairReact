import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, getProductReview } from '../actions/product';
import { addToCart } from '../actions/cart';
import ProductInfo from '../components/ProductInfo';
import Page404 from '../components/Page404';

class ProductPage extends Component {
  state = {
    selectedImg: undefined,
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.getProduct(productId);
    this.props.getProductReview(productId);
  }

  componentWillUnmount() { this.props.getProducts(); }

  addToCart = (itemId) => {
    this.props.addToCart(itemId, 'XS');
  }

  onImageSwitch = (selectedImg) => {
    this.setState({ selectedImg });
  }

  addToWishlist = (itemId, rating) => this.props.addToWishlist(itemId, rating)

  render() {
    const { product, reviews } = this.props;
    const { selectedImg } = this.state;
    const avgRating = (reviews) ? reviews.reduce((acc, rate) => acc + rate.rating, 0)
    / reviews.length : 0;

    return (
      <React.Fragment>
        {product ? (
          <ProductInfo
            product={product}
            reviews={reviews}
            reviewsCount={0}
            addToCart={this.addToCart}
            addToWishlist={this.addToWishlist}
            onImageSwitch={this.onImageSwitch}
            selectedImg={selectedImg || product.image}
            averageRating={avgRating}
          />
        ) : <Page404 />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.productInfo,
  reviews: state.product.productReviews,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProduct,
  getProductReview,
  addToCart,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
