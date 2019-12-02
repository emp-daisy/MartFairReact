import React from 'react';
import {
  Button,
  Header,
  Divider,
  Icon,
} from 'semantic-ui-react';

const OrderCompleted = ({ error, message }) => (
  <React.Fragment>
    <Icon
      name={error ? 'exclamation triangle' : 'rocket'}
      size="massive"
      {...(error) ? { color: 'red' } : { className: 'yellish' }}
    />
    <Header as="h1">{error ? 'OH No!' : 'Success!'}</Header>
    <p>{`${message || 'Your items will be shipped shortly and you wil get an email soon'}`}</p>
    <Divider />
    <Button className="yellish roundish" as="a" href="/">
        Back to home
    </Button>
  </React.Fragment>
);

export default OrderCompleted;
