import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Menu, Container, Icon, Grid, Segment, List, Button, Header, Table, Accordion, Modal, Form,
} from 'semantic-ui-react';
import { getWishlist, moveToCart } from '../actions/cart';
import {
  getCustomer, updateCustomerCard, updateCustomerDetails, updateCustomerAddress,
} from '../actions/customer';
import { getShippings } from '../actions/shipping';
import { getCustomerOrders, getOrder } from '../actions/order';
import Erroring from '../components/Erroring';
import PageLoader from '../components/placeholders/PageLoader';

class ProfilePage extends Component {
  state = {
    activeOrderId: -1,
    creditCard: '',
    activeModal: null,
  };

  componentDidMount=() => {
    this.getMenuItems();
    this.props.getShippings();
  }

  componentDidUpdate = (prevProps) => {
    const { customerInfo, history: { location: { pathname } } } = this.props;
    const { pathname: prevPathname } = prevProps.history.location;

    if (customerInfo !== prevProps.customerInfo) {
      this.handleModalClose();
    }
    if (pathname !== prevPathname) {
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
    }
  }

  handleModalOpen = activeModal => this.setState({ activeModal })

  handleModalClose = () => this.setState({ activeModal: null })

  handleItemClick = (_e, { name }) => this.props.history.push(`/${name}`)

  customerDetails = () => {
    const { customerInfo = {}, loading } = this.props;
    const { activeModal } = this.state;
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
              <Table.Cell>
                <Table style={{ border: 'none' }}>
                  <Table.Body>
                    <Table.Row><Table.Cell>Name</Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>Email</Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>Contact</Table.Cell></Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="edit" onClick={() => this.handleModalOpen('customer_details')} />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Table.Cell>
              <Table.Cell>
                <Table style={{ border: 'none' }}>
                  <Table.Body>
                    <Table.Row><Table.Cell>{customerInfo.name}</Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>{customerInfo.email}</Table.Cell></Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {customerInfo.day_phone}
                        <br />
                        {customerInfo.eve_phone}
                        <br />
                        {customerInfo.mob_phone}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Address
                <Icon name="edit" onClick={() => this.handleModalOpen('customer_address')} style={{ paddingLeft: '5px' }} />
              </Table.Cell>
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
            <Table.Row>
              <Table.Cell>
                Billing
                <Icon name="edit" onClick={() => this.handleModalOpen('customer_card')} style={{ paddingLeft: '5px' }} />
              </Table.Cell>
              <Table.Cell>{customerInfo.credit_card}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Modal
          open={activeModal !== null}
          onClose={this.handleModalClose}
          size="tiny"
          closeIcon={!loading}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <Modal.Content>
            { activeModal === 'customer_card' && this.editCustomerCard()}
            { activeModal === 'customer_details' && this.editCustomerDetails()}
            { activeModal === 'customer_address' && this.editCustomerAddress()}
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }

  editCustomerDetails = () => (
    <Form size="small">
      <Header icon="user" content="Edit details" />
      <Form.Input
        fluid
        placeholder="Name"
      />
      <Form.Input
        fluid
        placeholder="Email"
      />

      <Form.Group widths={2}>
        <Form.Input
          placeholder="Day Phone Number"
        />
        <Form.Input
          placeholder="Night Phone Number"
        />
      </Form.Group>

      <Form.Group widths={2}>
        <Form.Input
          placeholder="Mobile Phone Number"
          name="mob_phone"
        />
        <Form.Input
          fluid
          placeholder="Password"
          type="password"
          name="password"
          // value={password}
          // onChange={this.handleChange}
        />
      </Form.Group>
      <Button
        onClick={() => this.props.updateCustomerDetails(this.state.customerDetails)}
        className="yellish roundish"
        size="large"
      >
          Save
      </Button>
    </Form>
  )

  editCustomerAddress = () => {
    const { shippingRegion } = this.props;
    return (
      <Form size="small">
        <Header icon="user" content="Edit address" />
        <Form.Input
          fluid
          placeholder="Address"
        />
        <Form.Input
          fluid
          placeholder="Address"
        />

        <Form.Group widths={2}>
          <Form.Input
            placeholder="City"
          />
          <Form.Input
            placeholder="Region"
          />
          <Form.Select options={shippingRegion || []} placeholder="Region" />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input
            placeholder="Postcode"
          />
          <Form.Input
            fluid
            placeholder="Country"
          />
        </Form.Group>
        <Button
          onClick={() => this.props.updateCustomerAddress(this.state.customerAddress)}
          className="yellish roundish"
          size="large"
        >
            Save
        </Button>
      </Form>
    );
  }

  editCustomerCard = () => {
    const { loading } = this.props;
    const { creditCard } = this.state;
    return (
      <Form size="small">
        <Header icon="credit card" content="Edit saved card" />
        <Form.Input
          fluid
          icon="credit card"
          iconPosition="left"
          placeholder="Card Number"
          onChange={(_e, { value }) => this.setState({ creditCard: value })}
        />
        <Button
          className="yellish roundish"
          size="large"
          loading={loading}
          disabled={
            !creditCard || creditCard - Math.floor(creditCard) !== 0 || creditCard.length < 10
          }
          onClick={() => this.props.updateCustomerCard(creditCard)}
        >
            Save card
        </Button>
      </Form>
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
        <Header>Wishlist</Header>
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
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case '/account':
        return this.customerDetails();
      case '/orders':
        return this.customerOrders();
      case '/wishlist':
        return this.customerWishlist();
      default:
        return <Erroring message="Seems you lost your way" icon="exclamation triangle" />;
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
    if (!this.props.loggedIn) this.props.history.replace('/');
    const { loading } = this.props;
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
              {loading ? <PageLoader /> : this.getMenuView()}
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
  loading: state.customer.loading,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getWishlist,
  getCustomer,
  getCustomerOrders,
  moveToCart,
  getOrder,
  getShippings,
  updateCustomerCard,
  updateCustomerDetails,
  updateCustomerAddress,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
