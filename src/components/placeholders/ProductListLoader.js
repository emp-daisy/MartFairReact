import React from 'react';
import _ from 'lodash';
import { Card, Placeholder } from 'semantic-ui-react';

const ProductListLoader = () => (
  <Card style={{ width: '180px' }}>
    <Placeholder>
      <Placeholder.Image square />
    </Placeholder>
    <Card.Content textAlign="center">
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length="medium" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Card.Content>
  </Card>
);

export default () => _.times(4, index => <ProductListLoader key={index} />);
