import React, { Component } from 'react';
import {
  Header, Table, Button, Container, Responsive, Image,
} from 'semantic-ui-react';
import NumberInput from './NumberInput';
import logo from '../assets/a-partridge-in-a-pear-tree-2.gif';

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
            <Image className="ui image" size="mini" src={logo} />
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
          <a className="yellish" href="/">Remove </a>
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
            {itemName}
          </Header>
          <p>
            {size}
          </p>
        </Table.Cell>
        <Table.Cell singleLine textAlign="center">
          <NumberInput defaultValue={quantity} />
          <Header as="h4">
            {amount}
          </Header>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Header as="h3">
            {subTotal}
          </Header>
          <a className="yellish" href="/">Remove </a>
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
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Unit Price</Table.HeaderCell>
        <Table.HeaderCell>Sub Total</Table.HeaderCell>
      </Responsive>
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Table.HeaderCell singleLine textAlign="center">Item / Size</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Quantity \ Unit Price</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Sub Total</Table.HeaderCell>
      </Responsive>
    </React.Fragment>
  )

  render() {
    const isMobileColumn = window && window.innerWidth < Responsive.onlyMobile.maxWidth ? 3 : 5;
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
              <Table.HeaderCell colSpan={isMobileColumn - 1}>
                <Header textAlign="right">Total:</Header>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Header>$9.50</Header>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={isMobileColumn}>
                <Button icon className="yellish inverted roundish" as="a" href="/">
                Back to shop
                </Button>
                <Button floated="right" icon className="yellish roundish" as="a" href="/checkout">
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
