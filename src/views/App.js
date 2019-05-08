import React from 'react'; import {
  Container, Header,
} from 'semantic-ui-react';
import ProductListContainer from '../containers/ProductListContainer';

function App() {
  return (
    <React.Fragment>
      <Container text>
        <Header
          as="h1"
          content="Homepage"
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '1em',
          }}
        />
        <Header
          as="h2"
          content="Do whatever you want when you want to."
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1em',
          }}
        />
      </Container>
      <ProductListContainer />
    </React.Fragment>
  );
}

export default App;
