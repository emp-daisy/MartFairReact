import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { getProduct, getProducts, getProductReview } from '../actions/product';
import { getAttributesForProduct } from '../actions/attribute';
import { addToCart, addToWishlist, removeProductFromCart } from '../actions/cart';
import ProductInfo from '../components/ProductInfo';
import Page404 from '../components/Page404';
import ProductInfoLoader from '../components/placeholders/ProductInfoLoader';

class ProductPage extends Component {
  state = {
    selectedImg: undefined,
    selectedAttributes: {},
    quantity: 1,
    missingAttributes: false,
    zoom: false,
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.getProduct(productId);
    this.props.getAttributesForProduct(productId);
    this.props.getProductReview(productId);
  }

  componentWillUnmount() { this.props.getProducts(); }

  addToCart = () => {
    const attr = [...new Set(this.props.attributes.map(item => item.attribute_name))];
    const selectedAttr = Object.values(this.state.selectedAttributes);
    if (attr.length !== selectedAttr.length) this.setState({ missingAttributes: true });
    else {
      this.setState({ missingAttributes: false });
      this.props.addToCart(this.props.product.product_id, selectedAttr.join(','));
    }
  }

  onQuantityChange = quantity => this.setState({ quantity })

  onImageSwitch = selectedImg => this.setState({ selectedImg });

  onZoom = () => this.setState(state => ({ zoom: !state.zoom }))

  onAttributeSelect = (e, { name, value }) => {
    this.setState(state => ({
      selectedAttributes: { ...state.selectedAttributes, [name]: value },
      missingAttributes: false,
    }));
  }

  addToWishlist = (rating) => {
    if (rating) this.props.addToWishlist(this.props.product.product_id);
    else this.props.removeProductFromCart(this.props.product.product_id);
  }

  render() {
    const {
      product, reviews, loading, attributes,
    } = this.props;
    const {
      selectedImg, quantity, selectedAttributes, missingAttributes, zoom,
    } = this.state;
    const avgRating = (reviews) ? reviews.reduce((acc, rate) => acc + rate.rating, 0)
    / reviews.length : 0;
    return (
      <React.Fragment>
        {(product) ? (
          <ProductInfo
            product={product}
            reviews={reviews}
            reviewsCount={(reviews || []).length}
            addToCart={this.addToCart}
            addToWishlist={this.addToWishlist}
            onImageSwitch={this.onImageSwitch}
            onAttributeSelect={this.onAttributeSelect}
            selectedImg={selectedImg || product.image}
            averageRating={avgRating}
            loading={loading}
            quantity={quantity}
            attributes={
              _.mapValues(_.groupBy(attributes, 'attribute_name'), clist => clist.map(({ attribute_value_id, attribute_value }) => ({ key: attribute_value_id, text: attribute_value, value: attribute_value })))
            }
            onQuantityChange={this.onQuantityChange}
            selectedAttributes={selectedAttributes}
            missingAttributes={missingAttributes}
            zoom={zoom}
            onZoom={this.onZoom}
          />
        )
          : (
            <React.Fragment>
              {
                (loading) ? <ProductInfoLoader /> : <Page404 />
              }
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.product.loading,
  product: state.product.productInfo,
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
  addToCart,
  addToWishlist,
  removeProductFromCart,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
