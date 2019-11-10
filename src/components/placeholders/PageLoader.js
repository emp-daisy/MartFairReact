import React from 'react';
import { Placeholder, Dimmer, Loader } from 'semantic-ui-react';

const PageLoader = () => (
  <React.Fragment>
    <Dimmer active inverted>
      <Loader indeterminate>Loading...</Loader>
    </Dimmer>
    <Placeholder>
      <Placeholder.Paragraph>
        <Placeholder.Line length="full" />
        <Placeholder.Line />
        <Placeholder.Line length="full" />
      </Placeholder.Paragraph>
    </Placeholder>
  </React.Fragment>
);

export default PageLoader;
