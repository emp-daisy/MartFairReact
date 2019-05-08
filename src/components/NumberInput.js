import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const NumberInput = ({ defaultValue = 1, onChange, id }) => {
  let value = defaultValue;
  const minusBtn = () => {
    value -= 1;
    onChange(id, value);
  };
  const plusBtn = () => {
    value += 1;
    onChange(id, value);
  };
  return (
    <div>
      <Button icon="minus" size="mini" circular onClick={minusBtn} />
      <Input
        disabled
        size="mini"
        min="1"
        max="5"
        value={value}
        className="number-counter"
        style={{ margin: '5px' }}
      />
      <Button icon="plus" size="mini" circular onClick={plusBtn} />
    </div>
  );
};

export default NumberInput;
