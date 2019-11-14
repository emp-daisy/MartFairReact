import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Header,
  Table,
  Button,
  Container,
  Responsive,
} from 'semantic-ui-react';
import {
  getCartProducts,
  updateProductQuantity,
  removeProductFromCart,
  totalAmount,
  addToWishlist,
} from '../actions/cart';
import Cart from '../components/Cart';
import Erroring from '../components/Erroring';
import CartLoader from '../components/placeholders/CartLoader';

class CartPage extends Component {
  componentDidMount() {
    this.props.getCartProducts();
    this.props.totalAmount();
  }

  componentDidUpdate(nextProps) {
    if (this.props.totalCost !== nextProps.totalCost) {
      this.props.totalAmount();
    }
  }

  updateProductQuantity = (item_id, quantity) => {
    this.props.updateProductQuantity(item_id, quantity);
  };

  removeItem = (event, item_id) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.removeProductFromCart(item_id);
  };

  render() {
    const isMobileColumn = window && window.innerWidth < Responsive.onlyMobile.maxWidth ? 3 : 5;
    const { products, totalCost, cartLoading } = this.props;
    return (
      <Container textAlign="center">
        <Header textAlign="center" as="h2" style={{ margin: '15px auto' }}>
          Cart
        </Header>
        {products && products.length > 0 ? (
          <Table unstackable>
            <Table.Header>
              <Table.Row><Cart.Header /></Table.Row>
            </Table.Header>
            <Table.Body>
              {products.map(product => (
                <Table.Row key={product.item_id}>
                  <Cart.Row
                    {...product}
                    removeItem={this.removeItem}
                    updateProductQuantity={value => (
                      this.updateProductQuantity(product.item_id, value))}
                    addToWishlist={this.props.addToWishlist}
                  />
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan={isMobileColumn - 1}>
                  <Header textAlign="right">Total:</Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Header>{`$${totalCost}`}</Header>
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan={isMobileColumn}>
                  <Button
                    icon
                    className="yellish inverted roundish"
                    as="a"
                    href="/"
                  >
                    Back to shop
                  </Button>
                  <Button
                    floated="right"
                    icon
                    className="yellish roundish"
                    as="a"
                    href="/checkout"
                  >
                    Checkout
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table>
        ) : (
          <React.Fragment>
            { (cartLoading) ? <CartLoader /> : <Erroring message="No item in cart" icon="shopping cart" /> }
          </React.Fragment>
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
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCartProducts,
    updateProductQuantity,
    removeProductFromCart,
    totalAmount,
    addToWishlist,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartPage);
