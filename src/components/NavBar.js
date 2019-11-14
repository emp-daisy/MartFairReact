import React, { Component } from 'react';
import {
  Container,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SearchProduct from './SearchProduct';
import logo from '../assets/images/logo.svg';
import logoBlk from '../assets/images/icon.svg';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class NavBar extends Component {
  state = { sidebarOpened: false, fixed: false }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  hideFixedMenu = () => this.setState({ fixed: false })

  showFixedMenu = () => this.setState({ fixed: true })

  myAccount=() => {
    const { onLogOut, loggedIn, pathname } = this.props;
    return (
      <Dropdown text="My account">
        <Dropdown.Menu>
          {!loggedIn && (
          <React.Fragment>
            {pathname !== '/login' && <Dropdown.Item as="a" href="/login" text="Login" />}
            {pathname !== '/register' && <Dropdown.Item as="a" href="/register" text="Register" />}
            <Dropdown.Divider />
          </React.Fragment>
          )}
          {loggedIn && (
          <React.Fragment>
            {pathname !== '/account' && <Dropdown.Item as="a" href="/account" text="My account" />}
            {pathname !== '/orders' && <Dropdown.Item as="a" href="/orders" text="My orders" />}
            {pathname !== '/wishlist' && <Dropdown.Item as="a" href="/wishlist" text="My saved items" />}
            <Dropdown.Divider />
            <Dropdown.Item text="Log Out" onClick={onLogOut} />
          </React.Fragment>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  shoppingCart = () => {
    const { cartSize } = this.props;
    return (
      <React.Fragment>
        <Icon name="shopping cart" size="large" />
        { cartSize > 0
          && (
          <div className="floating ui red label cart-badge">
            <span className="counter">{cartSize}</span>
          </div>
          )
        }
      </React.Fragment>
    );
  }

  searchBar=() => {
    const {
      isLoading, searchResult, onResultSelect, onSearchChange,
    } = this.props;
    return (
      <SearchProduct
        isLoading={isLoading}
        searchResult={searchResult}
        onResultSelect={onResultSelect}
        onSearchChange={onSearchChange}
      />
    );
  }

  departmentList=() => {
    const { departments, onDepartmentClick } = this.props;
    return (
      (departments)
        ? departments.map(({ department_id, name }) => (
          <Menu.Item
            key={department_id}
            as="a"
            onClick={() => { onDepartmentClick(department_id); }}
          >
            {name}
          </Menu.Item>
        ))
        : null);
  }

  mobile = () => {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={1000}
      >
        <Sidebar.Pushable
          as={Segment}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" href="/">
              <Image size="mini" src={logo} />
            </Menu.Item>
            <Menu.Item header href="/">Mart Fair</Menu.Item>
            {this.departmentList()}
            <Menu.Item>
              {this.myAccount()}
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Segment
              inverted
              textAlign="center"
              style={{ padding: '0em' }}
              vertical
            >
              <Container fluid>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" size="large" />
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <this.searchBar />
                    </Menu.Item>
                    <Menu.Item href="/cart" as="a" className="shopping-icon">
                      {this.shoppingCart()}
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              </Container>
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }

  desktop =() => {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        minWidth={1001}
      >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: '0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              borderless
              size="large"
            >
              <Container>
                <Menu.Item as="a" href="/">
                  <Image size="mini" src={(fixed) ? logoBlk : logo} />
                </Menu.Item>
                <Menu.Item header href="/">Mart Fair</Menu.Item>
                {this.departmentList()}
                <Menu.Menu position="right">
                  <Menu.Item>
                    <this.searchBar />
                  </Menu.Item>
                  <Menu.Item>
                    {this.myAccount()}
                  </Menu.Item>
                  <Menu.Item href="/cart" as="a" className="shopping-icon">
                    {this.shoppingCart()}
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.mobile()}
        {this.desktop()}
      </React.Fragment>
    );
  }
}

NavBar.defaultProps = {
  cartSize: 0,
  isLoading: false,
  loggedIn: false,
  pathname: '',
  onResultSelect: () => {},
  onSearchChange: () => {},
  onLogOut: () => {},
  onDepartmentClick: () => {},
  searchResult: [],
  departments: [],
  children: undefined,
};

NavBar.propTypes = {
  children: PropTypes.node,
  cartSize: PropTypes.number,
  pathname: PropTypes.string,
  isLoading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  onResultSelect: PropTypes.func,
  onSearchChange: PropTypes.func,
  onDepartmentClick: PropTypes.func,
  onLogOut: PropTypes.func,
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
  departments: PropTypes.arrayOf(PropTypes.shape({
    department_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default NavBar;
