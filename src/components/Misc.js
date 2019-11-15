import React from 'react';
import {
  Tab, Container,
} from 'semantic-ui-react';
import Faq from './Faq';
import Information from './Information';

const panes = [
  {
    menuItem: 'FAQ',
    pane: (<Tab.Pane key="tab1"><Faq /></Tab.Pane>),
  },
  {
    menuItem: 'Shipping',
    pane: (<Tab.Pane key="tab2"><Information title="Shipping Information" /></Tab.Pane>),
  },
  {
    menuItem: 'Returns',
    pane: (<Tab.Pane key="tab3"><Information title="Tracking Information" /></Tab.Pane>),
  },
  {
    menuItem: 'Tracking',
    pane: (<Tab.Pane key="tab4"><Information title="Return Policy" /></Tab.Pane>),
  },
];

const Misc = ({index = 0}) => (
  <Container style={{ marginTop: '50px' }}>
    <Tab defaultActiveIndex={index} menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} renderActiveOnly={false} />
  </Container>
);

export default Misc;
