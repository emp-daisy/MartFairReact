import React from 'react';
import {
  Button, Divider, Form,
  Grid, Header, Segment,
} from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign="center" style={{ minHeight: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size="large">
        <Segment raised>
          <Header as="h2" className="yellish" textAlign="center">
          Login
          </Header>
          <Form.Input
            fluid
            icon="user"
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
          <Form.Checkbox label="Remember me" />
          <Button className="yellish" fluid size="large" style={{ borderRadius: '500rem' }}>
              Sign in
          </Button>

          <Divider horizontal>Or</Divider>
          <Button color="facebook" content="Sign in with Facebook" icon="facebook" labelPosition="left" />


          <Grid columns={2} stackable inverted style={{ paddingTop: 30 }}>
            <Grid.Row>
              <Grid.Column width={8}>
                <a className="yellish" href="/">Forgot password</a>
              </Grid.Column>
              <Grid.Column width={8}>
                <a className="yellish" href="/register">Have an account?</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>

    </Grid.Column>
  </Grid>
);

export default LoginForm;
