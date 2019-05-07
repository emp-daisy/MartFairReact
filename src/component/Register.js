import React from 'react';
import {
  Button, Divider, Form, Grid, Header, Segment,
} from 'semantic-ui-react';

const RegisterForm = () => (
  <Grid textAlign="center" style={{ minHeight: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size="large">
        <Segment raised>
          <Header as="h2" className="yellish" textAlign="center">
        Sign up
          </Header>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Full name"
          />
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="E-mail address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Verify Password"
            type="password"
          />
          <Button className="yellish" fluid size="large" style={{ borderRadius: '500rem' }}>
            Login
          </Button>

          <Divider horizontal>Or</Divider>
          <Button color="facebook" content="Sign up with Facebook" icon="facebook" labelPosition="left" />

          <Grid columns={1} stackable inverted style={{ paddingTop: 30 }}>
            <Grid.Row>
              <Grid.Column>
        Already a member?
                {' '}
                <a className="yellish" href="/login">Sign in</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default RegisterForm;
