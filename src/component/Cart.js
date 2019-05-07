import React, { Component } from 'react';
import {
  Header, Table, Button, Container, Responsive,
} from 'semantic-ui-react';
import NumberInput from './NumberInput';

const getWidth = () => (typeof window === 'undefined'
  ? Responsive.onlyTablet.minWidth
  : window.innerWidth);

class Cart extends Component {
  cartRow=({
    itemName, size, amount, subTotal, quantity,
  }) => (
    <React.Fragment>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Table.Cell>
          <Header as="h4">
            {itemName}
          </Header>
        </Table.Cell>
        <Table.Cell>{size}</Table.Cell>
        <Table.Cell singleLine>
          <NumberInput defaultValue={quantity} />
        </Table.Cell>
        <Table.Cell>
          <Header as="h4">
            {amount}
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">
            {subTotal}
          </Header>
        </Table.Cell>
      </Responsive>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Table.Cell>
          <Header as="h4">
            {itemName}
          </Header>
          <Header as="h6">
            {size}
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>
          <NumberInput defaultValue={quantity} />
          <Header as="h4">
            {amount}
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">
            {subTotal}
          </Header>
        </Table.Cell>
      </Responsive>
    </React.Fragment>
  )

  cartHeader=() => (
    <React.Fragment>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Table.HeaderCell singleLine> Item </Table.HeaderCell>
        <Table.HeaderCell>Size</Table.HeaderCell>
        <Table.HeaderCell textAlign="left">Quantity</Table.HeaderCell>
        <Table.HeaderCell>Unit Price</Table.HeaderCell>
        <Table.HeaderCell>Sub Total</Table.HeaderCell>
      </Responsive>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Table.HeaderCell singleLine>Item / Size</Table.HeaderCell>
        <Table.HeaderCell textAlign="left">Quantity \ Unit Price</Table.HeaderCell>
        <Table.HeaderCell>Sub Total</Table.HeaderCell>
      </Responsive>
    </React.Fragment>
  )

  render() {
    return (
      <Container textAlign="center">
        <Header textAlign="center" as="h2" style={{ margin: '15px auto' }}>Cart</Header>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              {this.cartHeader()}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {this.cartRow({
                itemName: 'Power Output', size: 'XS', amount: '$0.50', subTotal: '$1.00', quantity: 2,
              })}
            </Table.Row>
            <Table.Row>
              {this.cartRow({
                itemName: 'Power Output', size: 'S', amount: '$8.50', subTotal: '$8:50', quantity: 1,
              })}
            </Table.Row>
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={window && window.innerWidth < 768 ? 2 : 4}>
                <Header textAlign="right">Total:</Header>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Header>$9.50</Header>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={window && window.innerWidth < 768 ? 3 : 5}>
                <Button icon className="yellish-invert" as="a" href="/">
                Back to shop
                </Button>
                <Button floated="right" icon className="yellish">
                Checkout
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

export default Cart;
