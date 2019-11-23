import React from 'react';
import {
  Header, Form, Modal, Button, Table,
} from 'semantic-ui-react';
import PageLoader from './placeholders/PageLoader';

const Customer = ({
  activeModal, loading, customerInfo, creditCard, shippingRegion, customerData,
  handleModalClose, saveLoading, updateCustomerCard, updateCustomerAddress, updateCustomerPassword,
  updateCustomerDetails, handleModalOpen, handleChange,
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
                          <a
                            className="yellish"
                            href="/"
                            onClick={handleModalOpen('customer_details')}
                          >
                            Edit
                          </a>
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
                  <br />
                  <a
                    className="yellish"
                    href="/"
                    onClick={handleModalOpen('customer_address')}
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  {`${customerInfo.address_1}${customerInfo.address_2 ? ', ' : ''} ${customerInfo.address_2 || ''}`}
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
                  <br />
                  <a
                    className="yellish"
                    href="/"
                    onClick={handleModalOpen('customer_card')}
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>{customerInfo.credit_card}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan={2} textAlign="right">
                  <Button
                    onClick={handleModalOpen('customer_password')}
                    className="yellish roundish"
                    size="small"
                    compact
                  >
                      Change Password
                  </Button>
                </Table.Cell>
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
              { activeModal === 'customer_password' && <EditCustomerPassword customerData={customerData} loading={saveLoading} updateCustomerPassword={updateCustomerPassword} handleChange={handleChange} />}
              { activeModal === 'customer_card' && <EditCustomerCard creditCard={creditCard} loading={saveLoading} updateCustomerCard={updateCustomerCard} handleChange={handleChange} />}
              { activeModal === 'customer_details' && <EditCustomerDetails loading={saveLoading} updateCustomerDetails={updateCustomerDetails} customerDetails={customerData} handleChange={handleChange} />}
              { activeModal === 'customer_address' && <EditCustomerAddress shippingRegion={shippingRegion} loading={saveLoading} updateCustomerAddress={updateCustomerAddress} customerAddress={customerData} handleChange={handleChange} />}
            </Modal.Content>
          </Modal>
        </React.Fragment>
      ) : <PageLoader />
    }
  </React.Fragment>
);

const EditCustomerDetails = ({ updateCustomerDetails, customerDetails, handleChange }) => (
  <Form size="small" autoComplete="off">
    <Header icon="user" content="Edit details" />
    <Form.Input
      fluid
      placeholder="Name"
      value={customerDetails.name}
      onChange={(_e, { value }) => handleChange('name', value)}
    />
    <Form.Input
      fluid
      placeholder="Email"
      value={customerDetails.email}
      onChange={(_e, { value }) => handleChange('email', value)}
    />

    <Form.Group widths={2}>
      <Form.Input
        placeholder="Day Phone Number"
        value={customerDetails.day_phone}
        onChange={(_e, { value }) => handleChange('day_phone', value)}
      />
      <Form.Input
        placeholder="Night Phone Number"
        value={customerDetails.eve_phone}
        onChange={(_e, { value }) => handleChange('eve_phone', value)}
      />
    </Form.Group>

    <Form.Group widths={2}>
      <Form.Input
        type="text"
        placeholder="Mobile Phone Number"
        value={customerDetails.mob_phone}
        onChange={(_e, { value }) => handleChange('mob_phone', value)}
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

const EditCustomerAddress = ({
  shippingRegion, customerAddress, updateCustomerAddress, handleChange,
}) => (
  <Form size="small" autoComplete="off">
    <Header icon="user" content="Edit address" />
    <Form.Input
      fluid
      placeholder="Address 1"
      value={customerAddress.address_1}
      onChange={(_e, { value }) => handleChange('address_1', value)}
    />
    <Form.Input
      fluid
      placeholder="Address 2"
      value={customerAddress.address_2}
      onChange={(_e, { value }) => handleChange('address_2', value)}
    />
    <Form.Group widths={2}>
      <Form.Input
        placeholder="City"
        value={customerAddress.city}
        onChange={(_e, { value }) => handleChange('city', value)}
      />
      <Form.Input
        placeholder="Region"
        value={customerAddress.region}
        onChange={(_e, { value }) => handleChange('region', value)}
      />
      <Form.Select
        options={shippingRegion || []}
        placeholder="Shipping Region"
        value={customerAddress.shipping_region_id}
        onChange={(_e, { value }) => handleChange('shipping_region_id', value)}
      />
    </Form.Group>
    <Form.Group widths={2}>
      <Form.Input
        placeholder="Postcode"
        value={customerAddress.postal_code}
        onChange={(_e, { value }) => handleChange('postal_code', value)}
      />
      <Form.Input
        fluid
        placeholder="Country"
        value={customerAddress.country}
        onChange={(_e, { value }) => handleChange('country', value)}
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
  <Form size="small" autoComplete="off">
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
        !creditCard || creditCard - Math.floor(creditCard) !== 0 || creditCard.length < 13
      }
      onClick={() => updateCustomerCard(creditCard)}
    >
      Save card
    </Button>
  </Form>
);

const EditCustomerPassword = ({
  loading, customerData: { old_password, new_password, confirm_password },
  updateCustomerPassword, handleChange,
}) => (
  <Form size="small" autoComplete="off">
    <Header icon="lock" content="Edit password" />
    <Form.Input
      fluid
      icon="lock"
      iconPosition="left"
      placeholder="Old password"
      type="password"
      onChange={(_e, { value }) => handleChange('old_password', value)}
    />
    <Form.Input
      fluid
      icon="lock"
      iconPosition="left"
      placeholder="New password"
      type="password"
      onChange={(_e, { value }) => handleChange('new_password', value)}
    />
    <Form.Input
      fluid
      icon="lock"
      iconPosition="left"
      placeholder="Confirm New password"
      type="password"
      onChange={(_e, { value }) => handleChange('confirm_password', value)}
    />
    <Button
      className="yellish roundish"
      size="large"
      loading={loading}
      disabled={
        !old_password || !new_password || new_password.length < 6
        || new_password !== confirm_password
      }
      onClick={() => updateCustomerPassword({ old_password, new_password, confirm_password })}
    >
      Save Password
    </Button>
  </Form>
);

export default Customer;
