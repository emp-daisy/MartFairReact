import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import '../styles/stripe.css';

const createOptions = {
  style: {
    base: {
      iconColor: '#2e2e2e',
      color: '#2E2E2E',
      fontWeight: 500,
      fontFamily: 'OpenSans, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':-webkit-autofill': {
        color: '#2E2E2E',
      },
      '::placeholder': {
        color: '#6c6c6c',
      },
    },
    invalid: {
      iconColor: '#F63F5E',
      color: '#F63F5E',
    },
  },
};

class StripeForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      const { error, token } = await this.props.stripe.createToken();
      if (error) {
        this.handleChange({ error });
      } else {
        this.props.onClick(token.id);
      }
    }
  };

  render() {
    const { stripe, total } = this.props;
    const { errorMessage } = this.state;
    return (
      <React.Fragment>
        {stripe ? (
          <React.Fragment>
            <form className="ui form stripe-payment">
              <Message
                icon="money"
                header={`Requesting payment of $${total.toFixed(2)} to complete order.`}
              />
              <div className="equal width fields">
                <div className="field">
                  <label>
                    Card Number
                    <CardNumberElement
                      {...createOptions}
                      style={createOptions.style}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="equal width fields">
                <div className="field">
                  <label>
                    Expiration date
                    <CardExpiryElement
                      {...createOptions}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="field">
                  <label>
                    CVC
                    <CardCVCElement
                      id="cardCVC"
                      {...createOptions}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="field">
                  <small>
                    * CVV or CV2 is the security code, unique three digits on the
                    back of the card seperate from the number
                  </small>
                </div>
              </div>
            </form>
            {errorMessage && <Message attached error>{errorMessage}</Message>}
            <Button
              style={{ paddingTop: '10px', marginTop: '5px' }}
              className="yellish roundish"
              onClick={this.handleSubmit}
              disabled={!stripe}
            >
              Pay now
            </Button>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default injectStripe(StripeForm);
