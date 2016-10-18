import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import './App.css';
import ConnectionInfoTable from './ConnectionInfoTable';

/* eslint react/jsx-boolean-value:0 */

import actions from './actions';

class ActiveConnection extends React.Component {
  componentWillMount() {
    this.props.getActiveConnections();
  }

  componentWillReceiveProps(nextProps) {
    this.props.rescan(nextProps.shouldRescan);
  }

  render() {
    return (
      <Paper zDepth={1} style={{ marginBottom: 10 }}>
        <div className="paper-inner">
          <div style={{ marginBottom: 10 }}>
            <h3>Active Connection(s)</h3>
          </div>

          <div>
            {this.props.active_connections.map(conn => (
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
                  onTouchTap={this.props.disconnectIface(conn.interface)}
                />
              </div>
            ))}
          </div>
        </div>
      </Paper>
    );
  }
}

ActiveConnection.propTypes = {
  active_connections: React.PropTypes.arrayOf(React.PropTypes.object),
  getActiveConnections: React.PropTypes.func,
  disconnectIface: React.PropTypes.func,
  rescan: React.PropTypes.func,
};

const mapStateToProps = state => ({
  active_connections: state.active_connections,
  shouldRescan: state.shouldRescan,
});

const mapDispatchToPrps = dispatch => ({
  getActiveConnections() {
    dispatch(actions.getActiveConnections());
  },

  disconnectIface(iface) {
    return () => {
      dispatch(actions.disconnect(iface));
    };
  },

  rescan(shouldRescan) {
    if (shouldRescan) {
      dispatch(actions.getActiveConnections());
      dispatch(actions.rescan());
    }
  },
});


export default connect(mapStateToProps, mapDispatchToPrps)(ActiveConnection);
