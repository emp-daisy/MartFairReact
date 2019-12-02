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
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column mobile={8} tablet={4} computer={4} widescreen={4}>
            <Header inverted as="h4" content="About us" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={4} computer={4} widescreen={4}>
            <Header inverted as="h4" content="Questions?" />
            <List link inverted>
              <List.Item as="a" href="/help">Help</List.Item>
              <List.Item as="a" href="/tracking">Track order</List.Item>
              <List.Item as="a" href="/returns">Returns</List.Item>
              <List.Item as="a" href="/shipping">Shipping</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column tablet={8} only="tablet computer">
            <Header inverted as="h4" content="Footer Header" />
            <p>
                  Extra space for a call to action inside the footer that could help re-engage
                  users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider inverted section />

      <Grid stackable inverted>
        <Grid.Row>
          <Grid.Column width={10}>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="/contact">
              Contact Us
              </List.Item>
              <List.Item as="a" href="/terns-and-conditions">
              Terms and Conditions
              </List.Item>
              <List.Item as="a" href="/privacy">
              Privacy Policy
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={6}>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="https://emp-daisy.github.io/">
              &copy;
                {` ${new Date().getFullYear()} The Empress`}
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
