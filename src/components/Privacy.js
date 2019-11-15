import React from 'react';
import {
  Grid, Header, Container,
} from 'semantic-ui-react';

const Privacy = ({ text = '', title = 'Privacy Policy' }) => (
  <Grid container textAlign="center" style={{ marginTop: '20px' }}>
    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header as="h2">{title}</Header>
          <p>
            {text}
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Privacy;
