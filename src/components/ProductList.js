import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Grid, Card, Image, Pagination, Select, Menu, Responsive, Placeholder,
} from 'semantic-ui-react';
import ProductFilter from './ProductFilter';

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
          <label>
            Sort
            {'    '}
            <Select
              placeholder="Sort By"
              disabled={loading}
              options={sortOptions}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column mobile="16" tablet="4" computer="3"><ProductFilter /></Grid.Column>
        <Grid.Column mobile="16" tablet="12" computer="13" textAlign="center">
          <Card.Group
            {...(window && window.innerWidth < Responsive.onlyMobile.maxWidth)
              ? { centered: true } : {}}
          >

            { loading && (
              _.times(4, index => (
                <Card key={index} style={{ width: '180px' }}>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                  <Card.Content textAlign="center">
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="medium" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Card.Content>
                </Card>
              )))}
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
              totalPages={totalCount / numberPerPage}
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
              <Menu.Item
                name="50"
                active={numberPerPage === 50}
                onClick={() => onLimitChange(50)}
              />
              <Menu.Item
                name="100"
                active={numberPerPage === 100}
                onClick={() => onLimitChange(100)}
              />
            </Menu>
          </Grid.Row>
          )
          }
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
