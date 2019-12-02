import React from 'react';
import {
  Button,
  Grid,
  Header,
  Divider,
  Table,
  Input,
} from 'semantic-ui-react';

const OrderConfirmation = (props) => {
  const {
    decrementStep, incrementStep, products = [],
    shippingOption = {}, shippingAddress = {},
    subTotal = 0, grandTotal = 0,
  } = props;
  return (
    <React.Fragment>
      <Header as="h3" content="Confirmation" />
      <Grid stackable>
        <Grid.Row columns="equal">
          <Grid.Column width={11}>
            <Header as="h4" textAlign="left">Order summary</Header>
            <Table unstackable basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine width={9}>Item</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  products.map(product => (
                    <Table.Row key={`producc-${product.product_id}`}>
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>
                        {`$ ${product.price.toFixed(2)}`}
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={5} textAlign="left">
            <Header as="h4">Delivery</Header>
            <Header as="h4" className="greyish">Name</Header>
            <p>{shippingAddress.name}</p>
            <Header as="h4" className="greyish">Address</Header>
            <p>
              {`${shippingAddress.address_1}${shippingAddress.address_2 ? ', ' : ''} ${shippingAddress.address_2 || ''}`}
              <br />
              {shippingAddress.city}
              <br />
              {shippingAddress.postal_code}
              <br />
              {shippingAddress.country}
            </p>
            <Header as="h4" className="greyish">Delivery options</Header>
            <p>
              {shippingOption.shipping_type}
              <br />
              <span as="small-lead">
                {`($${shippingOption.shipping_cost}, ${shippingOption.shipping_description})`}
              </span>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns="equal">
          <Grid.Column>
            <Input icon={{ name: 'check' }} placeholder="Coupon" />
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Subtotal</Header>
            <Header as="p">{`$ ${subTotal.toFixed(2)}`}</Header>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Shipping</Header>
            <Header as="p">{`$ ${shippingOption.shipping_cost.toFixed(2)}`}</Header>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Grand total</Header>
            <Header as="p">{`$ ${grandTotal.toFixed(2)}`}</Header>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Button
              floated="left"
              className="yellish inverted roundish"
              onClick={decrementStep}
            >
              Back
            </Button>
            <Button
              floated="right"
              className="yellish roundish"
              onClick={incrementStep}
            >
              Next Step
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default OrderConfirmation;
