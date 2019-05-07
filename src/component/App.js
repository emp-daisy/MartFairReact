import React from 'react'; import {
  Container, Header,
} from 'semantic-ui-react';
import '../styles/App.css';

function App() {
  return (
    <Container text>
      <Header
        as="h1"
        content="Homepage"
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '2em',
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
    </Container>
  );
}

export default App;
