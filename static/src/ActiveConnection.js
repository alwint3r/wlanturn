import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './App.css';
import ConnectionInfoTable from './ConnectionInfoTable';

/* eslint react/jsx-boolean-value:0 */

const connectionMock = [
  {
    name: `Wifi Connection 1`,
    interface: `wlan0`,
    ip: `ip = 10.202.184.138/32, gw = 10.64.64.64`,
  },
];

const ActiveConnection = () => (
  <Paper zDepth={1}>
    <div className="paper-inner">
      <div style={{ marginBottom: 10 }}>
        <h3>Active Connection(s)</h3>
      </div>

      <div>
        {connectionMock.map(conn => (
          <div style={{ marginTop: 5, marginBottom: 20 }} key={conn.interface}>
            <ConnectionInfoTable
              name={conn.name}
              interface={conn.interface}
              ip={conn.ip}
            />

            <RaisedButton
              label="Disconnect"
              fullWidth={true}
              secondary={true}
              style={{ marginTop: 15 }}
            />
          </div>
        ))}
      </div>
    </div>
  </Paper>
);

export default ActiveConnection;
