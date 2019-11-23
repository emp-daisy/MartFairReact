import React from 'react';
import {
  Header, Grid,
} from 'semantic-ui-react';
import ProductListContainer from '../containers/ProductListContainer';

function App() {
  return (
    <React.Fragment>
      <Grid containerr>
        <Grid.Row columns={1} centered>
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
        </Grid.Row>
        <Grid.Row>
          <ProductListContainer />
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

export default App;
