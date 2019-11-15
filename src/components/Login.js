import React from 'react';
import {
  Button, Divider, Form,
  Grid, Header, Segment,
} from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign="center" verticalAlign="middle" style={{ margin: 'auto 0' }}>
    <Grid.Row>
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
            <Button className="yellish roundish" fluid size="large">
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
                  <a className="yellish" href="/register">{'Don\'t have an account?'}</a>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LoginForm;
