/* eslint import/extensions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory, Route } from 'react-router';

import 'flexboxgrid';

import App from './App';
import Login from './Login';
import './index.css';
import reducer from './reducer';
import middlewares from './middlewares';

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

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

const authChecking = (nextState, replace, callback) => {
  fetch(`/api/is_authenticated`)
    .then(res => res.json())
    .then((response) => {
      if (!response.authenticated) {
        replace(`/login`);
      }

      callback();
    });
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ThemedApp} onEnter={authChecking} />
      <Route path="/login" component={ThemedLogin} />
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
