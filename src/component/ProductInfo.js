import React from 'react';
import {
  Image, Grid, List, Tab, Header, Rating, Button, Label, Input, Item, Responsive,
} from 'semantic-ui-react';
import logo from '../assets/images/product_images/a-partridge-in-a-pear-tree-2.gif';

const panes = [
  { menuItem: 'Description', render: () => <Tab.Pane attached={false}><ProductDescription /></Tab.Pane> },
  { menuItem: 'Reviews', render: () => <Tab.Pane attached={false}><ProductReview /></Tab.Pane> },
];
const ProductDescription = () => (
  <div>
    <span>
      Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem!
      Repudiandae et! Massa senectus enim minim sociosqu delectus posuere. Suspendisse quos?
      Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et!
      Massa senectus enim minim sociosqu delectus posuere. Suspendisse quos?
      Tempus cras iure temporibus? Eu laudantium cubilia sem sem!
      Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
    </span>
  </div>
);

const ProductReview = () => (
  <Item.Group>
    <Item>
      <Item.Content>
        <Item.Header>User 1</Item.Header>
        <Item.Meta><Rating icon="star" size="tiny" defaultRating={3} maxRating={5} disabled /></Item.Meta>
        <Item.Description>
          Awesome
        </Item.Description>
      </Item.Content>
    </Item>

    <Item>
      <Item.Content>
        <Item.Header>User 2</Item.Header>
        <Item.Meta><Rating icon="star" size="tiny" defaultRating={1} maxRating={5} disabled /></Item.Meta>
        <Item.Description>
          Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem!
          Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
);

const ProductInfo = () => (
  <React.Fragment>
    <Grid stackable textAlign="center" style={{ padding: '20px 0' }}>
      <Grid.Row>
        <Grid columns={2} stackable inverted>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image className="ui centered image" size="small" src={logo} />
              <List divided horizontal verticalAlign="middle" style={{ padding: '10px 0' }}>
                <List.Item className="header">
                  <Image className="ui centered image" bordered size="mini" src={logo} />
                </List.Item>
                <List.Item className="header">
                  <Image className="ui centered image" size="mini" src={logo} />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10} textAlign="left">
              <Header>Product Name</Header>
              <span>
                <Rating icon="star" defaultRating={3} maxRating={5} disabled />
                {' '}
                41 reviews
              </span>
              <Header as="h3">
                <span>$ 20.50</span>
                <Label size="small" color="red" tag style={{ marginLeft: 30 }}> SALE: $ 15.00 </Label>
              </Header>
              <h5>
                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem!
                Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
              </h5>
              <div>
                <Button icon="minus" circular style={{ margin: '0 5px' }} />
                <Input
                  type="number"
                  disabled
                  min="1"
                  max="5"
                  defaultValue="1"
                />
                <Button icon="plus" circular style={{ margin: '0 5px' }} />
              </div>
              <div style={{ padding: '20px 0' }}>
                <Button className="yellish" size="small" style={{ borderRadius: '500rem' }}>
              Add to Cart
                </Button>
                <span style={{ marginLeft: 40 }}>
                  <Rating icon="heart" />
                  {' '}
                  Add to wishlist
                </span>

              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Row>
      <Grid.Row>

        <Responsive as={React.Fragment} {...Responsive.onlyMobile}>
          <Tab
            style={{ width: '100%', margin: '10px' }}
            className="product-tab"
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Responsive>
        <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          <Tab
            style={{ width: '100%', margin: '10px 10%' }}
            className="product-tab"
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Responsive>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);

export default ProductInfo;
