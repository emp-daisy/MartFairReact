import React, { Component } from 'react';
import {
  Button,
  Grid,
  Container,
  Step,
  Header,
  Icon,
  Divider,
  Checkbox,
  Select,
  Radio,
  Dimmer,
  Loader,
  Form,
  Input,
  Table,
  Segment,
} from 'semantic-ui-react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeForm from './StripeForm';

const stripePublicKey = 'pk_test_9CxzXal6aacokB09B8oy8SY500viaPTfIL';
const countries = [
  { key: 'm', text: 'Nigeria', value: 'nigeria' },
  { key: 'f', text: 'England', value: 'england' },
  { key: 'o', text: 'Other', value: 'other' },
];
class Checkout extends Component {
  state = {
    step: 1,
    stripe: null,
    shippingOption: 1,
    sameAddress: true,
  };

  componentDidMount() {
    this.loadStripe();
  }

  loadStripe = () => {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe('pk_test_12345') });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe(stripePublicKey) });
      });
    }
  };

  incrementStep = () => {
    this.setState(prev => ({ step: prev.step + 1 }));
  };

  decrementStep = () => {
    this.setState(prev => ({ step: prev.step - 1 }));
  };

  paymentToken = async () => {
    const { token } = await this.props.stripe.createToken({ name: 'Name' });
    return token;
  };

  addressForm = () => (
    <React.Fragment>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-first-name"
          label="First name"
          placeholder="First name"
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-last-name"
          label="Last name"
          placeholder="Last name"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-address"
          label="Address"
          placeholder="Address"
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-city"
          label="City"
          placeholder="City"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-state"
          label="State"
          placeholder="State"
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-zip-code"
          label="Zip code"
          placeholder="Zip code"
        />
      </Form.Group>
      <Form.Field
        control={Select}
        label="Country"
        options={countries}
        placeholder="Country"
      />
    </React.Fragment>
  );

  deliveryStep = () => (
    <React.Fragment>
      <Header as="h3" content="Delivery" />
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Form>
              {this.addressForm()}
              <Form.Group inline widths="equal">
                <Form.Field
                  control={Checkbox}
                  label={(
                    <label>
                      <Header as="h5">
                        My billing information is the same as my delivery
                        information
                      </Header>
                    </label>
)}
                  checked={this.state.sameAddress}
                  onChange={() => this.setState(prev => ({ sameAddress: !prev.sameAddress }))
                  }
                />
              </Form.Group>
              {!this.state.sameAddress && this.addressForm()}
              <Divider style={{ margin: '30px 0' }} />

              <Header>Delivery options</Header>
              <Form.Group inline widths="equal">
                <Form.Field
                  control={Radio}
                  label={(
                    <label>
                      <Header as="h5">
                        Standard shipping:
                        {' '}
                        <span className="small-lead">
                          (free, 2-3 business days)
                        </span>
                      </Header>
                    </label>
)}
                  value="1"
                  checked={this.state.shippingOption === 1}
                  onChange={() => this.setState({ shippingOption: 1 })}
                />
                <Form.Field
                  control={Radio}
                  label={(
                    <label>
                      <Header as="h5">
                        Express shipping:
                        {' '}
                        <span className="small-lead">
                          ($20, 1-2 business days)
                        </span>
                      </Header>
                    </label>
)}
                  value="2"
                  checked={this.state.shippingOption === 2}
                  onChange={() => this.setState({ shippingOption: 2 })}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Button
              className="yellish roundish"
              onClick={() => this.incrementStep()}
            >
              Next Step
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );

  confirmationStep = () => (
    <React.Fragment>
      <Header as="h3" content="Confirmation" />
      <Grid stackable>
        <Grid.Row stackable columns="equal">
          <Grid.Column width={10}>
            <Header as="h4" textAlign="left">Order summary</Header>
            <Table unstackable basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine width={10}>Item</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Power Output</Table.Cell>
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>$0.50</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Power Outlet</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>$8.50</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={6} textAlign="left">
            <Header as="h4">Delivery</Header>
            <Header as="h4" className="greyish">Address</Header>
            <p>Office 64 street</p>
            <p>Around the world, Earth 100000</p>
            <Header as="h4" className="greyish">Delivery options</Header>
            <p>Standard delivery</p>
            <span as="small-lead">(free, 2-3 days)</span>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns="equal">
          <Grid.Column>
            <Input icon={{ name: 'check' }} placeholder="Coupon" autoCapitalize />
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Subtotal</Header>
            <Header as="p">$10.50</Header>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Shipping</Header>
            <Header as="p">free</Header>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Header as="h4" className="greyish">Grand total</Header>
            <Header as="p">$100</Header>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row unstackable>
          <Grid.Column textAlign="left">
            <Button
              floated="left"
              className="yellish inverted roundish"
              onClick={() => this.decrementStep()}
            >
              Back
            </Button>
            <Button
              floated="right"
              className="yellish roundish"
              onClick={() => this.incrementStep()}
            >
              Next Step
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );

  paymentStep = () => (
    <React.Fragment>
      <Header as="h3" content="Payment" />
      <Grid>
        <Grid.Row>
          <Grid.Column
            textAlign="center"
            style={{ maxWidth: '500px', margin: 'auto' }}
          >
            {this.state.stripe === null ? (
              <Segment placeholder>
                <Dimmer active inverted>
                  <Loader indeterminate>Loading payment platform</Loader>
                </Dimmer>
              </Segment>
            ) : null}
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <StripeForm onClick={() => this.incrementStep()} />
              </Elements>
            </StripeProvider>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Button
              className="yellish inverted roundish"
              onClick={() => this.decrementStep()}
            >
              Back
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );

  successStep = () => (
    <React.Fragment>
      <Icon name="rocket" size="massive" className="yellish" />
      <Header as="h1">Success!</Header>
      <p>Your items will be shipped shortly and you wil get an email soon</p>
      <Divider />
      <Button className="yellish roundish" as="a" href="/">
        Back to home
      </Button>
    </React.Fragment>
  );

  render() {
    const { step } = this.state;
    return (
      <Container style={{ margin: '15px 0' }}>
        <Header>Checkout</Header>
        <Step.Group size="mini" fluid unstackable className="checkout">
          <Step active={step > 0}>
            <Step.Content>
              <Step.Title>Delivery</Step.Title>
            </Step.Content>
          </Step>
          <Step active={step > 1}>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
            </Step.Content>
          </Step>
          <Step active={step > 2}>
            <Step.Content>
              <Step.Title>Payment</Step.Title>
            </Step.Content>
          </Step>
          <Step active={step > 3}>
            <Step.Content>
              <Step.Title>Finish</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <Container style={{ textAlign: 'center' }}>
          {step === 1 && this.deliveryStep()}
          {step === 2 && this.confirmationStep()}
          {step === 3 && this.paymentStep()}
          {step === 4 && this.successStep()}
        </Container>
      </Container>
    );
  }
}

export default Checkout;
