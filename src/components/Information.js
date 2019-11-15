import React from 'react';
import _ from 'lodash';
import {
  Grid, Header, Placeholder,
} from 'semantic-ui-react';

const Dummy = () => (
  <Placeholder fluid>
    <Placeholder.Header>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    {
      _.times(4, () => (
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      ))
    }
  </Placeholder>
);
const Information = ({ text = '', title = 'Placeholder' }) => (
  <Grid textAlign="center" style={{ marginTop: '20px' }}>
    <Grid.Row>
      <Grid.Column>
        <Header as="h2">{title}</Header>
        <p>
          {text}
        </p>
        <Dummy />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Information;
