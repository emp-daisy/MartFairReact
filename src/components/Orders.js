import React from 'react';
import {
  Header, List, Icon, Accordion,
} from 'semantic-ui-react';
import PageLoader from './placeholders/PageLoader';

const Orders = ({
  customerOrders, customerOrderInfo, loading, activeOrderId, handleClick,
}) => (
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
          <React.Fragment>
            {
              (loading)
                ? <PageLoader />
                : <Accordion.Title active>No Order found!</Accordion.Title>
            }
          </React.Fragment>
        )
    }
    </Accordion>
  </React.Fragment>
);

export default Orders;
