import React from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import actions from './actions';

/* eslint react/jsx-boolean-value:0 */


const ConnectDialog = props => (
  <Dialog
    actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={props.handleClose}
      />,

      <FlatButton
        label="Connect"
        primary={true}
        onTouchTap={props.handleSubmit}
      />,
    ]}
    modal={true}
    onRequestClose={props.handleClose}
    open={(props.open ? props.open : props.rescan(props.loggedIn, props.shoudlRescan))}
    autoScrollBodyContent={true}
    title="Connect to Selected Access Point"
  >

    <div style={{ margin: 5 }}>
      <TextField
        value={props.ssidValue}
        id="ssid-value"
        floatingLabelText="SSID"
        fullWidth={true}
        disabled={true}
      />
      <TextField
        value={props.password}
        id="password-value"
        hintText="Leave it empty for open network"
        floatingLabelText="Password"
        onChange={props.onPasswordChange}
        type="password"
        fullWidth={true}
      />

      <Checkbox
        label="Force Connect"
        style={{ marginBottom: 10, marginTop: 10 }}
        checked={props.force}
        onCheck={props.onForceChecked}
      />
    </div>
  </Dialog>
);

ConnectDialog.propTypes = {
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
  password: React.PropTypes.string,
  ssidValue: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  onPasswordChange: React.PropTypes.func,
  onForceChecked: React.PropTypes.func,
  force: React.PropTypes.bool,
  rescan: React.PropTypes.func,
  loggedIn: React.PropTypes.bool,
  shoudlRescan: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  password: state.connect.password,
  ssidValue: state.connect.ssidValue,
  force: state.connect.force,
  loggedIn: state.loggedIn,
  shouldRescan: state.shouldRescan,
});

const mapDispatchToProps = dispatch => ({
  handleClose() {
    dispatch(actions.toggleConnectDialog());
  },
  onPasswordChange(event) {
    dispatch(actions.connectPasswordChange(event.target.value));
  },
  onForceChecked(event, value) {
    dispatch(actions.checkForceConnect(value));
  },
  handleSubmit() {
    dispatch(actions.connectWifi());
  },

  rescan(loggedIn, shouldRescan) {
    if (loggedIn && shouldRescan) {
      dispatch(actions.rescan());
    }

    return false;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDialog);
