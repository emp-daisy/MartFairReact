import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const NumberInput = ({ defaultValue = 1 }) => (
  <div>
    <Button icon="minus" size="mini" circular />
    <Input
      type="number"
      disabled
      min="1"
      max="5"
      defaultValue={defaultValue}
      style={{ margin: '5px' }}
    />
    <Button icon="plus" size="mini" circular />
  </div>
);

export default NumberInput;
