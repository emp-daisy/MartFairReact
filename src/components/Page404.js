import React from 'react';
import { Button, Header } from 'semantic-ui-react';

const Page404 = ({ message = 'Page not found' }) => (
  <div>
    <Header>{message}</Header>
    <Button className="yellish" size="mini" as="a" href="/">Go back</Button>
  </div>
);

export default Page404;
