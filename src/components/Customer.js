import React from 'react';
import {
  Header, Form, Icon, Modal, Button, Table,
} from 'semantic-ui-react';
import PageLoader from './placeholders/PageLoader';

const Customer = ({
  activeModal, loading, customerInfo, creditCard, shippingRegion, customerDetails,
  handleModalClose, saveLoading, updateCustomerCard, updateCustomerAddress,
  customerAddress, updateCustomerDetails, handleModalOpen, handleChange,
}) => (
  <React.Fragment>
    {
      (!loading) ? (
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
                          <Icon name="edit" onClick={() => handleModalOpen('customer_details')} />
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
                  <Icon name="edit" onClick={() => handleModalOpen('customer_address')} style={{ paddingLeft: '5px' }} />
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
                  <Icon name="edit" onClick={() => handleModalOpen('customer_card')} style={{ paddingLeft: '5px' }} />
                </Table.Cell>
                <Table.Cell>{customerInfo.credit_card}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Modal
            open={activeModal !== null}
            onClose={handleModalClose}
            size="tiny"
            closeIcon={!loading}
            closeOnEscape={false}
            closeOnDimmerClick={false}
          >
            <Modal.Content>
              { activeModal === 'customer_card' && <EditCustomerCard creditCard={creditCard} loading={saveLoading} updateCustomerCard={updateCustomerCard} handleChange={handleChange} />}
              { activeModal === 'customer_details' && <EditCustomerDetails loading={saveLoading} updateCustomerDetails={updateCustomerDetails} customerDetails={customerDetails} />}
              { activeModal === 'customer_address' && <EditCustomerAddress shippingRegion={shippingRegion} loading={saveLoading} updateCustomerAddress={updateCustomerAddress} customerAddress={customerAddress} />}
            </Modal.Content>
          </Modal>
        </React.Fragment>
      ) : <PageLoader />
    }
  </React.Fragment>
);

const EditCustomerDetails = ({ updateCustomerDetails, customerDetails }) => (
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
      onClick={() => updateCustomerDetails(customerDetails)}
      className="yellish roundish"
      size="large"
    >
        Save
    </Button>
  </Form>
);

const EditCustomerAddress = ({ shippingRegion, customerAddress, updateCustomerAddress }) => (
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
      onClick={() => updateCustomerAddress(customerAddress)}
      className="yellish roundish"
      size="large"
    >
      Save
    </Button>
  </Form>
);

const EditCustomerCard = ({
  loading, creditCard, updateCustomerCard, handleChange,
}) => (
  <Form size="small">
    <Header icon="credit card" content="Edit saved card" />
    <Form.Input
      fluid
      icon="credit card"
      iconPosition="left"
      placeholder="Card Number"
      onChange={(_e, { value }) => handleChange('creditCard', value)}
    />
    <Button
      className="yellish roundish"
      size="large"
      loading={loading}
      disabled={
        !creditCard || creditCard - Math.floor(creditCard) !== 0 || creditCard.length < 10
      }
      onClick={() => updateCustomerCard(creditCard)}
    >
      Save card
    </Button>
  </Form>
);

export default Customer;
