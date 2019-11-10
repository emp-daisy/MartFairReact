import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, Image } from 'semantic-ui-react';

class SearchProduct extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ value: '' })

  handleResultSelect = (e, { result }) => {
    this.props.onResultSelect(result);
    this.resetComponent();
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      return this.props.onSearchChange(value);
    }, 300);
  }

  render() {
    const { isLoading, searchResult } = this.props;
    return (
      <Search
        size="mini"
        input={{ icon: 'search', iconPosition: 'left' }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={searchResult}
        value={this.state.value}
        placeholder="Search"
        title="name"
        resultRenderer={({
          thumbnail, name,
        }) => (
          <div>
            <Image
              size="mini"
              verticalAlign="middle"
              src={`${process.env.PUBLIC_URL}/product_images/${thumbnail}`}
                  // eslint-disable-next-line no-param-reassign
              onError={(img) => { img.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'; }}
            />
            {name && <span className="title">{name}</span>}
          </div>
        )}
      />
    );
  }
}

SearchProduct.defaultProps = {
  isLoading: false,
  onResultSelect: () => {},
  onSearchChange: () => {},
  searchResult: [],
};

SearchProduct.propTypes = {
  isLoading: PropTypes.bool,
  onResultSelect: PropTypes.func,
  onSearchChange: PropTypes.func,
  searchResult: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

export default SearchProduct;
