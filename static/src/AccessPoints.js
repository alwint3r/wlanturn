import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './App.css';
import AccessPointTable from './AccessPointTable';

/* eslint react/jsx-boolean-value:0 */

const apMock = [
  {
    ssid: `X`,
    freq: `2412 MHz`,
    rate: `54 MB/s`,
    signal: `100`,
    security: `WPA2`,
    active: `no`,
  },
];

const AccessPoints = () => (
  <Paper zDepth={1}>
    <div className="paper-inner">
      <h3> Available Access Point(s) </h3>
      <div style={{ marginBottom: 10, textAlign: `right` }}>
        <RaisedButton label="Re-scan" primary={true} />
      </div>

      <AccessPointTable
        style={{ marginTop: 15 }}
        access_points={apMock}
      />
    </div>
  </Paper>
);

export default AccessPoints;
