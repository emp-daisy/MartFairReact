import React from 'react';
import {
  Container, Grid, List, Placeholder, Button, Rating,
} from 'semantic-ui-react';
import NumberInput from '../NumberInput';

const ProductInfoLoader = () => (
  <Container>
    <Grid stackable textAlign="center" style={{ padding: '20px 0' }}>
      <Grid.Row>
        <Grid columns={2} stackable inverted>
          <Grid.Row>
            <Grid.Column width={6}>
              <Placeholder style={{ height: 150, width: 150, margin: 'auto' }}>
                <Placeholder.Image />
              </Placeholder>
              <List divided horizontal verticalAlign="middle" style={{ padding: '10px 0' }}>
                <List.Item
                  className="header"
                >
                  <Placeholder style={{ height: 40, width: 40 }}>
                    <Placeholder.Image />
                  </Placeholder>
                </List.Item>
                <List.Item
                  className="header"
                >
                  <Placeholder style={{ height: 40, width: 40 }}>
                    <Placeholder.Image />
                  </Placeholder>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10} textAlign="left">
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="medium" />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="very long" />
                  <Placeholder.Line length="long" />
                </Placeholder.Paragraph>
              </Placeholder>
              <br />
              <NumberInput disabled />
              <div style={{ padding: '20px 0' }}>
                <Button className="yellish roundish" size="small" disabled>
                      Add to Cart
                </Button>
                <span style={{ marginLeft: 40 }}>
                  <Rating icon="heart" disabled />
                  {' '}
                  Add to wishlist
                </span>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Row>
    </Grid>
  </Container>
);

export default ProductInfoLoader;
