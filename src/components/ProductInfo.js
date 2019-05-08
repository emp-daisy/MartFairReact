import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Grid, List, Tab, Header, Rating, Button, Label, Item, Responsive, Container,
} from 'semantic-ui-react';
import NumberInput from './NumberInput';
import ProductRelated from './ProductRelated';

const panes = [
  {
    menuItem: 'Description',
    render: ({ product: { description } }) => (
      <Tab.Pane attached={false}>
        <div>
          <span>{description}</span>
        </div>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Reviews',
    render: ({ reviews }) => (
      <Tab.Pane attached={false}>
        <Item.Group>
          { (reviews && reviews.length > 0) ? reviews.map(({ name, review, rating }) => (
            <Item>
              <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta><Rating icon="star" size="tiny" rating={rating} maxRating={5} disabled /></Item.Meta>
                <Item.Description>{review}</Item.Description>
              </Item.Content>
            </Item>
          )) : (
            <Item>
              <Item.Content>No review available.</Item.Content>
            </Item>
          )
          }
        </Item.Group>
      </Tab.Pane>
    ),
  },
];

const ProductInfo = ({
  product, reviews, addToCart, onImageSwitch, selectedImg, averageRating,
}) => (
  <Container>
    <Grid stackable textAlign="center" style={{ padding: '20px 0' }}>
      <Grid.Row>
        <Grid columns={2} stackable inverted>
          <Grid.Row>
            <Grid.Column width={6}>
              <div>
                <Image
                  className="ui centered image"
                  size="small"
                  style={{ height: '150px', width: '150px' }}
                  src={`${process.env.PUBLIC_URL}/product_images/${selectedImg}`}
                />
              </div>
              <List divided horizontal verticalAlign="middle" style={{ padding: '10px 0' }}>
                <List.Item
                  className="header"
                  onClick={() => onImageSwitch(product.image)}
                >
                  <Image
                    className="ui centered image"
                    size="mini"
                    bordered
                    style={{ height: '40px', width: '40px' }}
                    src={`${process.env.PUBLIC_URL}/product_images/${product.image}`}
                  />
                </List.Item>
                <List.Item
                  className="header"
                  onClick={() => onImageSwitch(product.image_2)}
                >
                  <Image
                    className="ui centered image"
                    size="mini"
                    bordered
                    style={{ height: '40px', width: '40px' }}
                    src={`${process.env.PUBLIC_URL}/product_images/${product.image_2}`}
                  />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10} textAlign="left">
              <Header>{product.name}</Header>
              <span>
                <Rating icon="star" rating={averageRating} maxRating={5} disabled />
                { ` ${reviews.length} reviews`}
              </span>
              <Header as="h3">
                <span>{ `$ ${product.price}`}</span>
                <Label size="small" color="red" tag style={{ marginLeft: 30 }}>
                  {' '}
                  {`SALE: $ ${product.discounted_price}`}
                </Label>
              </Header>
              <h5>
                {product.description.substring(0, 200)}
              </h5>
              <NumberInput />
              <div style={{ padding: '20px 0' }}>
                <Button className="yellish roundish" size="small" onClick={() => addToCart(product.product_id)}>
                      Add to Cart
                </Button>
                {/* <span style={{ marginLeft: 40 }}>
                  <Rating icon="heart"
                  onRate={(e, { rating }) => addToWishlist(product.product_id, rating)} />
                  {' '}
                  Add to wishlist
                </span> */}
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
            reviews={reviews}
            product={product}
            panes={panes}
          />
        </Responsive>
        <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          <Tab
            style={{ width: '100%', margin: '10px 10%' }}
            className="product-tab"
            menu={{ secondary: true, pointing: true }}
            reviews={reviews}
            product={product}
            panes={panes}
          />
        </Responsive>
      </Grid.Row>
      <Grid.Row>
        <ProductRelated />
      </Grid.Row>
    </Grid>
  </Container>
);

ProductInfo.defaultProps = {
  reviews: [],
  averageRating: 0,
  addToCart: () => {},
  addToWishlist: () => {},
  onImageSwitch: () => {},
};

ProductInfo.propTypes = {
  product: PropTypes.objectOf(PropTypes.shape({
    product_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    discounted_price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    image: PropTypes.string,
    image_2: PropTypes.string,
  })).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    review: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  selectedImg: PropTypes.string.isRequired,
  averageRating: PropTypes.number,
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  onImageSwitch: PropTypes.func,
};

export default ProductInfo;
