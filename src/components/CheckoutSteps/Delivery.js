import React from 'react';
import {
  Button,
  Grid,
  Header,
  Divider,
  Checkbox,
  Radio,
  Form,
  Label,
} from 'semantic-ui-react';

const DeliveryAddress = ({ customerAddress, handleChange, shippingRegion }) => (
  <React.Fragment>
    <Form.Group widths={2}>
      <Form.Input
        fluid
        required
        id="form-subcomponent-shorthand-input-first-name"
        label="Full name"
        placeholder="Full name"
        value={customerAddress.name}
        onChange={(_e, { value }) => handleChange('name', value)}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        fluid
        required
        id="form-subcomponent-shorthand-input-address"
        label="Address"
        placeholder="Address"
        value={customerAddress.address_1}
        onChange={(_e, { value }) => handleChange('address_1', value)}
      />
      <Form.Input
        fluid
        id="form-subcomponent-shorthand-input-address"
        label="Address 2"
        placeholder="Address 2"
        value={customerAddress.address_2}
        onChange={(_e, { value }) => handleChange('address_2', value)}
      />
      {shippingRegion && (
        <Form.Select
          required
          options={(shippingRegion || []).map(({ shipping_region_id, shipping_region }) => ({
            key: `region-select-${shipping_region_id}`, text: shipping_region, value: shipping_region_id,
          }))}
          label="Shipping Region"
          placeholder="Shipping Region"
          value={customerAddress.shipping_region_id}
          onChange={(_e, { value }) => handleChange('shipping_region_id', value)}
        />
      )}
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        fluid
        required
        id="form-subcomponent-shorthand-input-city"
        label="City"
        placeholder="City"
        value={customerAddress.city}
        onChange={(_e, { value }) => handleChange('city', value)}
      />
      <Form.Input
        fluid
        required
        id="form-subcomponent-shorthand-input-post-code"
        placeholder="Postcode"
        label="Postcode"
        value={customerAddress.postal_code}
        onChange={(_e, { value }) => handleChange('postal_code', value)}
      />
      <Form.Input
        fluid
        required
        id="form-subcomponent-shorthand-input-country"
        placeholder="Country"
        label="Country"
        value={customerAddress.country}
        onChange={(_e, { value }) => handleChange('country', value)}
      />
    </Form.Group>
  </React.Fragment>
);

const Delivery = (props) => {
  const {
    shippingAddress, billingAddress, sameAddress, syncAddress, addressOption,
    onDeliveryAddressChange, onBillingAddressChange, shippingRegion, incrementStep,
    shippingOption, handleShippingOption, disabled,
  } = props;
  return (
    <React.Fragment>
      <Header as="h3" content="Delivery" />
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Form>
              <DeliveryAddress
                customerAddress={shippingAddress}
                handleChange={onDeliveryAddressChange}
                shippingRegion={shippingRegion}
              />
              <Form.Group inline widths="equal">
                <Form.Field
                  control={Checkbox}
                  label={(
                    <label>
                      <Header as="h5">
                        My billing information is the same as my delivery
                        information
                      </Header>
                    </label>
                    )}
                  checked={sameAddress}
                  onChange={syncAddress}
                />
              </Form.Group>
              {!sameAddress && (
              <DeliveryAddress
                customerAddress={billingAddress}
                handleChange={onBillingAddressChange}
              />
              )}
              <Divider style={{ margin: '30px 0' }} />
              <Header>
                Delivery options
                <Label as="a" basic size="mini" color="red">Required </Label>
              </Header>
              <Grid>
                <Grid.Row columns={3}>
                  {
                    addressOption.map(option => (
                      (option.shipping_region_id === shippingAddress.shipping_region_id) ? (
                        <Grid.Column key={`regions-${option.shipping_id}`}>
                          <Form.Field
                            control={Radio}
                            style={{ marginBottom: '20px' }}
                            label={(
                              <label>
                                <Header as="h5">
                                  {option.shipping_type}
                                  <br />
                                  <span className="small-lead">
                                    {`(${option.shipping_cost}, ${option.shipping_description})`}
                                  </span>
                                </Header>
                              </label>
                            )}
                            value={option.shipping_id}
                            checked={shippingOption.shipping_id === option.shipping_id}
                            onChange={() => handleShippingOption(option)}
                          />
                        </Grid.Column>
                      ) : null
                    ))
                    }
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Button
              className="yellish roundish"
              onClick={incrementStep}
              disabled={disabled}
            >
              Next Step
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default Delivery;
