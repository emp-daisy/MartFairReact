import React from 'react';
import {
  Button,
  Grid,
  Header,
  Divider,
  Dimmer,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeForm from '../StripeForm';
import PageLoader from '../placeholders/PageLoader';

const Payment = (props) => {
  const {
    decrementStep, onPay, stripe, total,
    orderLoading, paymentLoading,
  } = props;
  return (
    <React.Fragment>
      <Header as="h3" content="Payment" />
      <Grid>
        <Grid.Row>
          <Grid.Column
            textAlign="center"
            style={{ maxWidth: '500px', margin: 'auto' }}
          >
            {stripe === null ? (
              <Segment placeholder>
                <Dimmer active inverted>
                  <Loader indeterminate>Loading payment platform</Loader>
                </Dimmer>
              </Segment>
            ) : (
              <StripeProvider stripe={stripe}>
                <Elements>
                  <StripeForm stripe={stripe} onClick={onPay} total={total} />
                </Elements>
              </StripeProvider>
            )}
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Button
              className="yellish inverted roundish"
              onClick={decrementStep}
            >
              Back
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {(orderLoading || paymentLoading) ? (
        <PageLoader message={orderLoading ? 'Processing Order...' : 'Processing Payment...\nPlease do not refresh your browser!!!'} />
      ) : null
      }
    </React.Fragment>
  );
};

export default Payment;
