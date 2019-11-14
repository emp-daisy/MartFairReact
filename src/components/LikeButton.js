import React from 'react';
import { Rating } from 'semantic-ui-react';

const LikeButton = ({
  value = 0, onChange = () => {}, disabled, title = 'save for later',
}) => (
  <span>
    <Rating
      icon="heart"
      onRate={(_, { rating }) => onChange(rating)}
      disabled={disabled}
      rating={value}
    />
    {` ${title}`}
  </span>
);

export default LikeButton;
