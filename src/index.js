import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {
  Route, BrowserRouter as Router, Redirect, Switch,
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import App from './views/App';
import Contact from './components/Contact';
import Footer from './components/Footer';
import rootReducer from './reducers';
import * as serviceWorker from './utils/serviceWorker';
import CatalogSearch from './containers/CatalogSearch';
import TopNavigation from './containers/TopNavigation';
import ProductPage from './containers/ProductPage';
import LoginPage from './containers/LoginPage';
import { getUserToken } from './utils/localStore';
import { LOGIN_CONFIRM } from './action_types';
import CartPage from './containers/CartPage';
import ProfilePage from './containers/ProfilePage';
import ProductListContainer from './containers/ProductListContainer';
import RegisterPage from './containers/RegisterPage';
import MiscPage from './containers/MiscPage';
import CheckoutPage from './containers/CheckoutPage';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const hasToken = getUserToken();
if (hasToken) {
  store.dispatch({ type: LOGIN_CONFIRM });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <TopNavigation>
        <React.Fragment>
          <main className="main-content">
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/catalog-search" exact component={CatalogSearch} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/catalog/:id" exact component={ProductPage} />
              <Route path="/catalog" component={ProductListContainer} />
              <Route path="/cart" exact component={CartPage} />
              <Route path="/checkout" exact component={CheckoutPage} />
              <Route path={['/wishlist', '/orders', '/account']} exact component={ProfilePage} />
              <Route path={['/help', '/faq', '/tracking', '/shipping', '/returns', '/privacy', '/terns-and-conditions']} exact component={MiscPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </main>
          <Footer />
        </React.Fragment>
      </TopNavigation>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
