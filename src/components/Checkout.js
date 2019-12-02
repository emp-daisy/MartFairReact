import React, { Component } from 'react';
import {
  Container,
  Step,
  Header,
} from 'semantic-ui-react';
import Delivery from './CheckoutSteps/Delivery';
import OrderConfirmation from './CheckoutSteps/Confirmation';
import OrderPayment from './CheckoutSteps/Payment';
import OrderCompleted from './CheckoutSteps/Completed';
import { validateObject } from '../utils/validation';

const stripePublicKey = 'pk_test_9CxzXal6aacokB09B8oy8SY500viaPTfIL';

class Checkout extends Component {
  state = {
    step: 1,
    stripe: null,
    errorMessage: undefined,
  };

  componentDidMount() {
    this.loadStripe();
  }

  componentDidUpdate(prevProps) {
    if (this.props.paymentSuccess !== prevProps.paymentSuccess && this.props.paymentSuccess) {
      this.incrementStep();
    }
    if (this.props.paymentError !== prevProps.paymentError && this.props.paymentError) {
      this.failedOrder(this.props.paymentErrorMessage);
    }
    if (this.props.orderError !== prevProps.orderError && this.props.orderError) {
      this.failedOrder(this.props.orderErrorMessage);
    }
  }

  loadStripe = () => {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe('pk_test_9CxzXal6aacokB09B8oy8SY500viaPTfIL') });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe(stripePublicKey) });
      });
    }
  };

  incrementStep = () => this.setState(prev => ({ step: prev.step + 1 }))

  decrementStep = () => this.setState(prev => ({ step: prev.step - 1 }))

  makePayment = async (token) => {
    const {
      onPayment, grandTotal, shippingOption, shippingAddress,
    } = this.props;
    const delivery_address = `
      ${shippingAddress.name}\n
      ${shippingAddress.address_1}${shippingAddress.address_2 ? ', ' : ''} ${shippingAddress.address_2 || ''}\n
      ${shippingAddress.city}\n
      ${shippingAddress.postal_code}\n
      ${shippingAddress.country}
    `;
    onPayment({
      shipping_id: shippingOption.shipping_region_id,
      amount: grandTotal,
      token,
      delivery_address,
    });
  };

  failedOrder = errorMessage => this.setState({ errorMessage, error: true, step: 4 })

  invalidateDelivery = () => {
    const {
      shippingAddress, billingAddress, shippingOption,
    } = this.props;
    const valid = (
      !!shippingOption.shipping_region_id
      && validateObject(shippingAddress, ['name', 'address_1', 'city', 'region', 'postal_code', 'country', 'shipping_region_id'])
      && validateObject(billingAddress, ['name', 'address_1', 'city', 'region', 'postal_code', 'country'])
    );
    return !valid;
  }

  render() {
    const {
      step, stripe, errorMessage, error,
    } = this.state;
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
          {step === 1 && (
            <Delivery
              incrementStep={this.incrementStep}
              decrementStep={this.decrementStep}
              disabled={this.invalidateDelivery()}
              {...this.props}
            />
          )}
          {step === 2 && (
            <OrderConfirmation
              incrementStep={this.incrementStep}
              decrementStep={this.decrementStep}
              {...this.props}
            />
          )}
          {step === 3 && (
            <OrderPayment
              onPay={this.makePayment}
              decrementStep={this.decrementStep}
              stripe={stripe}
              total={this.props.grandTotal}
              {...this.props}
            />
          )}
          {step === 4 && <OrderCompleted message={errorMessage} error={error} />}
        </Container>
      </Container>
    );
  }
}

export default Checkout;
