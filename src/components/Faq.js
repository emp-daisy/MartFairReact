import React from 'react';
import {
  Grid, Header, Accordion,
} from 'semantic-ui-react';

const panels = [
  {
    key: 'what-can-i-order',
    title: 'How can I order?',
    content: `You can order easily using our online platform.
      When you find a product you need, you can add it to cart, login and go through the ordering process.`,
  },
  {
    key: 'payment-option',
    title: 'What payment methods can I use?',
    content: 'You can use all the major credit cards.',
  },
  {
    key: 'track-order',
    title: 'Can I track my order?',
    content: 'We will send you the tracking code of the shipment when the parcel has been sent.a',
  },
];
const Faq = ({ title = 'Frequently Asked Question' }) => (
  <Grid container style={{ marginTop: '20px' }}>
    <Grid.Row>
      <Grid.Column>
        <Header as="h2" textAlign="center">{title}</Header>
        <Accordion fluid styled defaultActiveIndex={0} panels={panels} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Faq;
