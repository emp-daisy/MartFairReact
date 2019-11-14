import React from 'react';
import {
  Button, Header, Container, Image, Icon,
} from 'semantic-ui-react';
import logo from '../assets/images/icon.svg';

const Erroring = ({
  message = 'Page not found', image = logo, icon,
}) => (
  <Container textAlign="center" className="align-self-center">
    {icon ? <Icon name={icon} size="massive" /> : <Image src={image} size="small" centered />}
    <Header>{message}</Header>
    <Button className="yellish" size="mini" as="a" href="/">Go back</Button>
  </Container>
);

export default Erroring;
