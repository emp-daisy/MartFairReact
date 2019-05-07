import React from 'react';
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';


const Footer = () => (
  <Segment inverted style={{ padding: '2em 0em' }} vertical>
    <Container textAlign="center">
      <Grid columns={4} divided stackable inverted>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Group 2" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header inverted as="h4" content="Footer Header" />
            <p>
                  Extra space for a call to action inside the footer that could help re-engage
                  users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider inverted section />

      <Grid columns={4} stackable inverted>
        <Grid.Row>
          <Grid.Column width={8}>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
              Site Map
              </List.Item>
              <List.Item as="a" href="/contact">
              Contact Us
              </List.Item>
              <List.Item as="a" href="#">
              Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
              Privacy Policy
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={8}>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
              &copy;
                {' '}
                {new Date().getFullYear()}
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
