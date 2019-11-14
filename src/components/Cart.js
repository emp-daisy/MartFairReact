import React from 'react';
import {
  Header, Table, Responsive, Image,
} from 'semantic-ui-react';
import NumberInput from './NumberInput';
import LikeButton from './LikeButton';

const getWidth = () => (typeof window === 'undefined'
  ? Responsive.onlyTablet.minWidth
  : window.innerWidth);

const CartHeader = () => (
  <React.Fragment>
    <Responsive
      as={React.Fragment}
      getWidth={getWidth}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      <Table.HeaderCell singleLine> Item </Table.HeaderCell>
      <Table.HeaderCell>Attributes</Table.HeaderCell>
      <Table.HeaderCell>Quantity</Table.HeaderCell>
      <Table.HeaderCell>Unit Price</Table.HeaderCell>
      <Table.HeaderCell>Sub Total</Table.HeaderCell>
    </Responsive>
    <Responsive
      as={React.Fragment}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Table.HeaderCell singleLine textAlign="center">
        Item / Size
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">
        Quantity \ Unit Price
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">Sub Total</Table.HeaderCell>
    </Responsive>
  </React.Fragment>
);

const CartRow = ({
  name, attributes, price, subtotal, quantity, item_id, thumbnail,
  removeItem, updateProductQuantity, addToWishlist,
}) => (
  <React.Fragment>
    <Responsive
      as={React.Fragment}
      getWidth={getWidth}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      <Table.Cell>
        <Header as="h4">
          <Image className="ui image" size="mini" src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`} />
          {name}
        </Header>
      </Table.Cell>
      <Table.Cell>{attributes}</Table.Cell>
      <Table.Cell>
        <NumberInput
          defaultValue={quantity}
          onChange={updateProductQuantity}
          id={item_id}
        />
        <LikeButton onChange={() => addToWishlist(item_id)} />
      </Table.Cell>
      <Table.Cell>
        <Header as="h4">{price}</Header>
      </Table.Cell>
      <Table.Cell>
        <Header as="h3">{subtotal}</Header>
        <a
          className="yellish"
          href="/"
          onClick={(e) => {
            removeItem(e, item_id);
          }}
        >
          Remove
        </a>
      </Table.Cell>
    </Responsive>
    <Responsive
      as={React.Fragment}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Table.Cell textAlign="center">
        <Image className="ui centered image" size="mini" src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`} />
        <Header as="h4" style={{ marginBottom: 0 }}>
          {name}
        </Header>
        <p>{attributes}</p>
      </Table.Cell>
      <Table.Cell singleLine textAlign="center">
        <NumberInput defaultValue={quantity} onChange={updateProductQuantity} />
        <LikeButton onChange={() => addToWishlist(item_id)} />
        <Header as="h4">{price}</Header>
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Header as="h3">{subtotal}</Header>
        <a
          className="yellish"
          href="/"
          onClick={(e) => {
            removeItem(e, item_id);
          }}
        >
          Remove
        </a>
      </Table.Cell>
    </Responsive>
  </React.Fragment>
);

export default {
  Header: CartHeader,
  Row: CartRow,
};
