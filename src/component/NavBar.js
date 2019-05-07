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

  myAccount=() => (
    <Dropdown text="My account">
      <Dropdown.Menu>
        <Dropdown.Item as="a" href="/login" text="Login" />
        <Dropdown.Item as="a" href="/register" text="Register" />
        <Dropdown.Divider />
        <Dropdown.Item text="My account" />
        <Dropdown.Item text="My orders" />
        <Dropdown.Item text="My saved items" />
      </Dropdown.Menu>
    </Dropdown>
  );

  mobile = () => {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={React.Fragment}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar.Pushable
          as={React.Fragment}
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
            <Menu.Item header>Mart Fair</Menu.Item>
            <Menu.Item as="a" href="/product/1">Women</Menu.Item>
            <Menu.Item as="a">Men</Menu.Item>
            <Menu.Item as="a">Kids</Menu.Item>
            <Menu.Item as="a">
              {this.myAccount()}
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ padding: '0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <SearchProduct />
                    </Menu.Item>
                    <Menu.Item>
                      <Icon name="shopping cart" size="large" />
                      <div
                        id="live_message_badge_main_header"
                        className="floating ui red label"
                        style={{ padding: '2px 3px', top: '10px', left: '55px' }}
                      >
                        <span className="live_message_badge">10</span>
                      </div>
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
        minWidth={Responsive.onlyTablet.minWidth}
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
                <Menu.Item header>Mart Fair</Menu.Item>
                <Menu.Item as="a" href="/product/1">Women</Menu.Item>
                <Menu.Item as="a">Men</Menu.Item>
                <Menu.Item as="a">Kids</Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <SearchProduct />
                  </Menu.Item>
                  <Menu.Item>
                    {this.myAccount()}
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="shopping cart" size="large" />
                    <div
                      id="live_message_badge_main_header"
                      className="floating ui red label"
                      style={{ padding: '2px 3px', top: '10px', left: '55px' }}
                    >
                      <span className="live_message_badge">10</span>
                    </div>
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

export default NavBar;
