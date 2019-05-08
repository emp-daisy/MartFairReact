import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Header,
  Table,
  Button,
  Container,
  Responsive,
  Image,
  Rating,
} from 'semantic-ui-react';
import NumberInput from '../components/NumberInput';
import logo from '../assets/a-partridge-in-a-pear-tree-2.gif';
import {
  getCartProducts,
  updateProductQuantity,
  removeProductFromCart,
  totalAmount,
  addToWishlist,
} from '../actions/cart';

const getWidth = () => (typeof window === 'undefined'
  ? Responsive.onlyTablet.minWidth
  : window.innerWidth);

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

  addToWishList = (item_id) => {
    this.props.addToWishList(item_id);
  };

  wishlistBtn = item_id => (
    <span>
      <Rating
        icon="heart"
        onRate={() => this.props.addToWishlist(item_id)}
      />
      {' '}
      save for later
    </span>
  );

  cartRow = ({
    name, attributes, price, subtotal, quantity, item_id,
  }) => (
    <React.Fragment>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Table.Cell>
          <Header as="h4">
            <Image className="ui image" size="mini" src={logo} />
            {name}
          </Header>
        </Table.Cell>
        <Table.Cell>{attributes}</Table.Cell>
        <Table.Cell>
          <NumberInput
            defaultValue={quantity}
            onChange={this.updateProductQuantity}
            id={item_id}
          />
          {this.wishlistBtn(item_id)}
        </Table.Cell>
        <Table.Cell>
          <Header as="h4">{price}</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">{subtotal}</Header>
          <a
            className="yellish"
            href="/"
            onClick={(e) => {
              this.removeItem(e, item_id);
            }}
          >
            Remove
            {' '}
          </a>
        </Table.Cell>
      </Responsive>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Table.Cell textAlign="center">
          <Image className="ui centered image" size="mini" src={logo} />
          <Header as="h4" style={{ marginBottom: 0 }}>
            {name}
          </Header>
          <p>{attributes}</p>
        </Table.Cell>
        <Table.Cell singleLine textAlign="center">
          <NumberInput defaultValue={quantity} />
          {this.wishlistBtn(item_id)}
          <Header as="h4">{price}</Header>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Header as="h3">{subtotal}</Header>
          <a
            className="yellish"
            href="/"
            onClick={(e) => {
              this.removeItem(e, item_id);
            }}
          >
            Remove
          </a>
        </Table.Cell>
      </Responsive>
    </React.Fragment>
  );

  cartHeader = () => (
    <React.Fragment>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Table.HeaderCell singleLine> Item </Table.HeaderCell>
        <Table.HeaderCell>Attributes</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Unit Price</Table.HeaderCell>
        <Table.HeaderCell>Sub Total</Table.HeaderCell>
      </Responsive>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Table.HeaderCell singleLine textAlign="center">
          Item / Size
        </Table.HeaderCell>
        <Table.HeaderCell textAlign="center">
          Quantity \ Unit Price
        </Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Sub Total</Table.HeaderCell>
      </Responsive>
    </React.Fragment>
  );

  render() {
    const isMobileColumn = window && window.innerWidth < Responsive.onlyMobile.maxWidth ? 3 : 5;
    const { products, totalCost } = this.props;
    return (
      <Container textAlign="center">
        <Header textAlign="center" as="h2" style={{ margin: '15px auto' }}>
          Cart
        </Header>
        {products && products.length > 0 ? (
          <Table unstackable>
            <Table.Header>
              <Table.Row>{this.cartHeader()}</Table.Row>
            </Table.Header>
            <Table.Body>
              {products.map(product => (
                <Table.Row key={product.item_id}>
                  {this.cartRow(product)}
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
          <div>No item in cart</div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.cartProducts,
  totalCost: state.cart.totalAmount,
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
