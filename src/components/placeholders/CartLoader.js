import React from 'react';
import {
  Container, Header, Table, Button, Placeholder, Responsive,
} from 'semantic-ui-react';
import Cart from '../Cart';

const isMobileColumn = window && window.innerWidth < Responsive.onlyMobile.maxWidth ? 3 : 5;

const CartLoader = () => (
  <Container textAlign="center">
    <Table unstackable>
      <Table.Header>
        <Table.Row><Cart.Header /></Table.Row>
      </Table.Header>
      <Table.Body>
        {[1, 2, 3].map(i => (
          <Table.Row key={i}>
            <Table.Cell>
              <Placeholder style={{ height: 75, width: 75 }}>
                <Placeholder.Image />
              </Placeholder>
            </Table.Cell>
            <Table.Cell colSpan={12}>
              <Placeholder fluid>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan={isMobileColumn - 1}>
            <Header textAlign="right">
              <Placeholder>
                <Placeholder.Line length="medium" />
              </Placeholder>
            </Header>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Header>
              <Placeholder>
                <Placeholder.Line length="medium" />
              </Placeholder>
            </Header>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan={isMobileColumn}>
            <Placeholder fluid>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan={isMobileColumn}>
            <Button className="yellish inverted roundish empty-button" disabled />
            <Button floated="right" className="yellish roundish empty-button" disabled />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </Container>
);

export default CartLoader;
