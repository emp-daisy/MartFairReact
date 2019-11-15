import React from 'react';
import {
  Button, Header, List, Image,
} from 'semantic-ui-react';
import PageLoader from './placeholders/PageLoader';

const WishList = ({ wishlistProducts, loading, moveToCart }) => (
  <React.Fragment>
    <Header>Wishlist</Header>
    <List divided verticalAlign="middle">
      {(wishlistProducts && wishlistProducts.length > 0) ? wishlistProducts.map(({
        item_id, name, price, attributes, thumbnail,
      }) => (
        <List.Item key={item_id}>
          <List.Content floated="left">
            <Image className="ui image" size="tiny" src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`} />
          </List.Content>
          <List.Content floated="right">
            <Button className="yellish" onClick={() => moveToCart(item_id)}>Buy Now</Button>
          </List.Content>
          <List.Content>
            <List.Header>{name}</List.Header>
            {`$${price}`}
            <List.Description>{attributes}</List.Description>
          </List.Content>
        </List.Item>
      ))
        : (
          <React.Fragment>
            {
              (loading) ? <PageLoader /> : <List.Item>No saved items</List.Item>
            }
          </React.Fragment>
        )
    }
    </List>
  </React.Fragment>
);

export default WishList;
