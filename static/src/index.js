/* eslint import/extensions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'flexboxgrid';

import App from './App';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById(`root`)
);
