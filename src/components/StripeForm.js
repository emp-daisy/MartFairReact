import React from 'react';
import { Button } from 'semantic-ui-react';
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

const StripeForm = ({ stripe, onClick }) => (
  <React.Fragment>
    {stripe ? (
      <React.Fragment>
        <form className="ui form stripe-payment">
          <div className="equal width fields">
            <div className="field card-name">
              <label>
                {`Cardholder${"'"}s Name`}
                <input
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="stripe-input"
                  required
                />
              </label>
            </div>
            <div className="field">
              <label>
                Card Number
                <CardNumberElement
                  {...createOptions}
                  style={createOptions.style}
                />
              </label>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <label>
                Expiration date
                <CardExpiryElement {...createOptions} />
              </label>
            </div>
            <div className="field">
              <label>
                CVC
                <CardCVCElement id="cardCVC" {...createOptions} />
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
        <Button
          style={{ paddingTop: '10px' }}
          className="yellish roundish"
          onClick={() => onClick()}
        >
          Pay now
        </Button>
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default injectStripe(StripeForm);
