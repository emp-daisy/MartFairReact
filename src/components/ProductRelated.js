import React from 'react';
import {
  Image, List, Divider,
} from 'semantic-ui-react';
import src from '../assets/a-partridge-in-a-pear-tree-2.gif';

const RelatedCard = ({ image, itemName, price }) => (
  <List.Item style={{
    width: '150px',
    border: '1px solid #22242626',
    margin: '0 5px',
    borderRadius: '.28571429rem',
    textAlign: 'center',
    display: 'inline-block',
  }}
  >
    <List.Content>
      <Image src={image} size="tiny" wrapped className="ui centered image" style={{ padding: '5px 0' }} />
      <List.Header>{itemName}</List.Header>
      {price}
    </List.Content>
  </List.Item>
);
const ProductRelated = () => (
  <React.Fragment>
    <div style={{ width: '100%' }}>
      <Divider horizontal>You may also like</Divider>
    </div>
    <div className="scrolling-wrapper">
      <RelatedCard className="card" image={src} itemName="VTee shirt" price="$10" />
      <RelatedCard className="card" image={src} itemName="VTee shirt" price="$10" />
      <RelatedCard className="card" image={src} itemName="VTee shirt" price="$10" />
      <RelatedCard className="card" image={src} itemName="aTee shirt" price="$1.50" />
      <RelatedCard className="card" image={src} itemName="xTee shirt" price="$1.50" />
      <RelatedCard className="card" image={src} itemName="VTee shirt" price="$10" />
      <RelatedCard className="card" image={src} itemName="aTee shirt" price="$1.50" />
    </div>
  </React.Fragment>
);

export default ProductRelated;
