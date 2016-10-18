/* eslint import/extensions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory, Route } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';
import 'flexboxgrid';

import App from './App';
import Login from './Login';
import './index.css';
import reducer from './reducer';
import middlewares from './middlewares';

const createPersistStore = compose(applyMiddleware(...middlewares), autoRehydrate())(createStore);
const store = createPersistStore(reducer);
persistStore(store);

injectTapEventPlugin();

const ThemedApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

const ThemedLogin = () => (
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ThemedApp} />
      <Route path="/login" component={ThemedLogin} />
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
