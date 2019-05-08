import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Menu, Container, Icon, Grid, Segment, List, Button, Header, Table, Accordion,
} from 'semantic-ui-react';
import { getWishlist, moveToCart } from '../actions/cart';
import { getCustomer } from '../actions/customer';
import { getCustomerOrders, getOrder } from '../actions/order';
import Page404 from '../components/Page404';

class ProfilePage extends Component {
  state = {
    activeOrderId: -1,
  };

  componentDidMount=() => {
    this.getMenuItems();
  }

  handleItemClick = (_e, { name }) => this.props.history.push(`/${name}`)

  customerDetails = () => {
    const { customerInfo } = this.props;
    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Customer Information</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{customerInfo.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{customerInfo.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Address</Table.Cell>
              <Table.Cell>
                {customerInfo.address_1}
                <br />
                {customerInfo.address_2}
                <br />
                {customerInfo.city}
                <br />
                {customerInfo.postal_code}
                <br />
                {customerInfo.country}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }

  customerOrders = () => {
    const { customerOrders, customerOrderInfo } = this.props;
    const { activeOrderId } = this.state;
    const handleClick = (_e, { order_id }) => {
      this.props.getOrder(order_id);
      const { activeOrderId: activeOrder } = this.state;
      this.setState({ activeOrderId: activeOrder === order_id ? -1 : order_id });
    };
    return (
      <React.Fragment>
        <Header>Orders</Header>
        <Accordion fluid styled>
          {(customerOrders && customerOrders.length > 0) ? customerOrders.map(({
            order_id, total_amount, created_on,
          }) => (
            <React.Fragment key={order_id}>
              <Accordion.Title active order_id={order_id} onClick={handleClick}>
                <Icon name="dropdown" />
                {new Date(created_on).toLocaleDateString()}
                <span style={{ float: 'right' }}>{`$ ${total_amount}`}</span>
              </Accordion.Title>
              <Accordion.Content active={activeOrderId === order_id}>
                <List divided verticalAlign="middle">
                  {(customerOrderInfo && customerOrderInfo.length > 0) ? customerOrderInfo.map(({
                    order_id: id, attributes, product_name, quantity, unit_cost,
                  }) => (
                    <List.Item key={id}>
                      <List.Content floated="right">
                        <List.Description>{`${quantity} X $ ${unit_cost}`}</List.Description>
                      </List.Content>
                      <List.Content>
                        <List.Header>{product_name}</List.Header>
                        <List.Description>{attributes}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))
                    : (
                      <List.Item>
                        Loading details
                      </List.Item>
                    )
                }
                </List>
              </Accordion.Content>
            </React.Fragment>
          ))
            : (
              <Accordion.Title active>
                No Order found!
              </Accordion.Title>
            )
        }
        </Accordion>
      </React.Fragment>
    );
  }

  customerWishlist = () => {
    const { wishlistProducts } = this.props;
    return (
      <React.Fragment>
        <Header textAlign="center">Wishlist</Header>
        <List divided verticalAlign="middle">
          {(wishlistProducts && wishlistProducts.length > 0) ? wishlistProducts.map(({
            item_id, name, price, attributes,
          }) => (
            <List.Item key={item_id}>
              <List.Content floated="right">
                <Button className="yellish" onClick={() => this.props.moveToCart(item_id)}>Buy Now</Button>
              </List.Content>
              <List.Content>
                <List.Header>{name}</List.Header>
                {`$${price}`}
                <List.Description>{attributes}</List.Description>
              </List.Content>
            </List.Item>
          ))
            : (
              <List.Item>
                No saved items
              </List.Item>
            )
        }
        </List>
      </React.Fragment>
    );
  }

  getMenuView = () => {
    this.getMenuItems();
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case '/account':
        return this.customerDetails();
      case '/orders':
        return this.customerOrders();
      case '/wishlist':
        return this.customerWishlist();
      default:
        return <Page404 message="Seems you lost your way" />;
    }
  }

  getMenuItems = () => {
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case '/account':
        this.props.getCustomer();
        break;
      case '/orders':
        this.props.getCustomerOrders();
        break;
      case '/wishlist':
        this.props.getWishlist();
        break;
      default:
        this.props.getCustomer();
        break;
    }
  };

  render() {
    if (!this.props.loggedIn) {
      this.props.history.replace('/');
    }
    const { pathname } = this.props.history.location;
    return (
      <Container style={{ padding: '30px 0' }}>
        <Grid colums={2}>
          <Grid.Column tablet={4} mobile={5} computer={4}>
            <Menu fluid vertical>
              <Menu.Item
                name="account"
                active={pathname === '/account'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="orders"
                active={pathname === '/orders'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="wishlist"
                active={pathname === '/wishlist'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched tablet={12} mobile={11} computer={11}>
            <Segment>
              {this.getMenuView()}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  wishlistProducts: state.cart.wishlistProducts,
  customerOrders: state.order.customerOrders,
  customerOrderInfo: state.order.customerOrderInfo,
  customerInfo: state.customer.customerInfo,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getWishlist, getCustomer, getCustomerOrders, moveToCart, getOrder,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
