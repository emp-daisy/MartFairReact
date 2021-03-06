import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Card, Image, Pagination, Select, Menu,
} from 'semantic-ui-react';
import ProductFilter from './ProductFilter';
import ProductListLoader from './placeholders/ProductListLoader';

const sortOptions = [
  { key: 'mpop', text: 'Most Popular', value: 'popular' },
  { key: 'lprice', text: 'Low to High Price', value: 'low-price' },
  { key: 'hprice', text: 'High to Low Price', value: 'high-price' },
];

const ProductList = ({
  products, totalCount, currentPage, numberPerPage, loading, onPageChange, onLimitChange,
}) => (
  <React.Fragment>
    <Grid style={{ margin: '10px' }} stackable>
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Select
            placeholder="Sort By"
            disabled={loading}
            options={sortOptions}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column mobile="16" tablet="4" computer="4"><ProductFilter /></Grid.Column>
        <Grid.Column mobile="16" tablet="12" computer="12" textAlign="center">
          <Card.Group textAlign="center" centered>
            { loading && <ProductListLoader /> }
            { !loading && products.map(({
              product_id: id, thumbnail, name, price,
            }) => (
              <Card key={id} style={{ width: '180px' }} href={`/catalog/${id}`}>
                <Image
                  src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`}
                  // eslint-disable-next-line no-param-reassign
                  onError={(img) => { img.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'; }}
                  size="small"
                  wrapped
                  className="ui centered image"
                  style={{ padding: '10px 0' }}
                />
                <Card.Content textAlign="center">
                  <Card.Header>{name}</Card.Header>
                  <Card.Meta>{`$${price}`}</Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          {(!loading && products && products.length > 0) && (
            <Grid.Row style={{ margin: '30px 0' }}>
              <Pagination
                defaultActivePage={currentPage}
                totalPages={Math.ceil(totalCount / numberPerPage)}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                onPageChange={onPageChange}
              />
              <Menu text compact floated="right">
                <Menu.Item header>View:</Menu.Item>
                <Menu.Item
                  name="24"
                  active={numberPerPage === 24}
                  onClick={() => onLimitChange(24)}
                />
                {totalCount > 51 && (
                  <Menu.Item
                    name="50"
                    active={numberPerPage === 50}
                    onClick={() => onLimitChange(50)}
                  />
                )}
                {totalCount > 101 && (
                <Menu.Item
                  name="100"
                  active={numberPerPage === 100}
                  onClick={() => onLimitChange(100)}
                />
                )}
              </Menu>
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);

ProductList.defaultProps = {
  totalCount: 1,
  currentPage: 1,
  numberPerPage: 24,
  onPageChange: () => {},
  onLimitChange: () => {},
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    product_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    thumbnail: PropTypes.string.isRequired,
  })).isRequired,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  numberPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onLimitChange: PropTypes.func,
};

export default ProductList;
