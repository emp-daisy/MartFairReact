import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Grid, List, Tab, Header, Rating, Button, Label, Item, Responsive, Container, Select, Modal,
} from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
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

const ImageSlide = ({ onZoom, images }) => (
  <Modal
    open
    onClose={onZoom}
    closeIcon
    closeOnEscape
    closeOnDimmerClick
    size="tiny"
  >
    <Modal.Content>
      <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
    </Modal.Content>
  </Modal>
);

const ProductInfo = ({
  product, reviews, addToCart, onImageSwitch, selectedImg, averageRating, onAttributeSelect,
  attributes, missingAttributes, selectedAttributes, zoom, onZoom,
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
                  style={{ height: '200px', width: '200px', cursor: 'zoom-in' }}
                  src={`${process.env.PUBLIC_URL}/product_images/${selectedImg}`}
                  onClick={onZoom}
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
                  {` SALE: $ ${product.discounted_price}`}
                </Label>
              </Header>
              <h5>
                {product.description.substring(0, 200)}
              </h5>
              <Grid columns="equal">
                {
                  Object.keys(attributes).map(attr => (
                    <Grid.Column>
                      <label>{attr}</label>
                      <br />
                      <Select
                        name={attr}
                        onChange={onAttributeSelect}
                        placeholder="Select your color"
                        options={attributes[attr]}
                        error={(missingAttributes && !selectedAttributes[attr]) ? { content: 'Please select an option!', pointing: 'below' } : false}
                      />
                    </Grid.Column>
                  ))
                }
              </Grid>
              <div style={{ padding: '20px 0', display: 'flex' }}>
                <Button className="yellish roundish" style={{ margin: '0 10px' }} size="small" onClick={addToCart}>
                  Add to Cart
                </Button>
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
    { zoom && (
      <ImageSlide
        onZoom={onZoom}
        images={[
          `${process.env.PUBLIC_URL}/product_images/${product.image}`,
          `${process.env.PUBLIC_URL}/product_images/${product.image_2}`,
        ].map(pic => ({ original: pic, thumbnail: pic }))}
      />
    ) }
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
