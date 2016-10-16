import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
    modal={false}
    onRequestClose={props.handleClose}
    open={props.open}
    autoScrollBodyContent={true}
    title="Connect to Selected Access Point"
  >

    <div style={{ margin: 5 }}>
      <TextField
        value={props.ssidValue}
        id="ssid-value"
        floatingLabelText="SSID"
        disabled={true}
        fullWidth={true}
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
};

export default ConnectDialog;
