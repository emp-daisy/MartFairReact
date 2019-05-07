import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './component/App';
import Register from './component/Register';
import Login from './component/Login';
import Contact from './component/Contact';
import ProductInfo from './component/ProductInfo';
import * as serviceWorker from './utils/serviceWorker';

import rootReducer from './reducers';
import Footer from './component/Footer';
import NavBar from './component/NavBar';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <NavBar />
    <React.Fragment>
      <main className="main-content">
        <Router>
          <Route path="/" component={App} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/product/:id" component={ProductInfo} />
        </Router>
      </main>
      <Footer />
    </React.Fragment>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
