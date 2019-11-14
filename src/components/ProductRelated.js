import React from 'react';
import {
  Image, List, Divider,
} from 'semantic-ui-react';

const ProductRelated = ({ products }) => (
  <React.Fragment>
    <div style={{ width: '100%' }}>
      <Divider horizontal>You may also like</Divider>
    </div>
    <div className="scrolling-wrapper">
      {products.map(({
        product_id: id, thumbnail, name, price,
      }) => (
        <List.Item
          key={id}
          className="related-list"
          href={`/catalog/${id}`}
        >
          <List.Content>
            <Image src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`} size="tiny" wrapped className="ui centered image" style={{ padding: '5px 0' }} />
            <List.Header>{name}</List.Header>
            {`$ ${price}`}
          </List.Content>
        </List.Item>
      ))}
    </div>
  </React.Fragment>
);

export default ProductRelated;
