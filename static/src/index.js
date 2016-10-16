/* eslint import/extensions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'flexboxgrid';

import App from './App';
import './index.css';
import reducer from './reducer';
import middlewares from './middlewares';

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`root`)
);
