import React from 'react';
import {
  Grid, Header,
} from 'semantic-ui-react';

const Terms = ({ text = '', title = 'Privacy Policy' }) => (
  <Grid container textAlign="center" style={{ marginTop: '20px' }}>
    <Grid.Row>
      <Grid.Column>
        <Header>{title}</Header>
        <br />
        {text}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Terms;
