import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

const ContactForm = () => (
  <Grid textAlign="center" style={{ minHeight: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size="large">
        <Segment stacked>
          <Header as="h2" className="yellish" textAlign="center">
          COntact Us.
          </Header>
          <Form.Input
            fluid
            placeholder="Name"
          />
          <Form.Input
            fluid
            placeholder="E-mail"
          />
          <Form.TextArea
            fluid
            placeholder="Your Message."
          />
          <Button className="yellish" fluid size="large" style={{ borderRadius: '500rem' }}>
              Send
          </Button>
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

export default ContactForm;
