import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

/* eslint react/jsx-boolean-value:0 */


const ChangePasswordDialog = props => (
  <Dialog
    actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={props.handleClose}
      />,

      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={props.handleSubmit}
      />,
    ]}
    modal={false}
    onRequestClose={props.handleClose}
    open={props.open}
    autoScrollBodyContent={true}
    title="Change Password"
  >

    <div style={{ margin: 5 }}>
      <TextField
        value={props.oldPassword}
        id="old-password"
        floatingLabelText="Old Password"
        onChange={props.onOldPasswordChange}
        type="password"
        fullWidth={true}
      />

      <TextField
        value={props.newPassword}
        id="new-password"
        floatingLabelText="New Password"
        onChange={props.onNewPasswordChange}
        type="password"
        fullWidth={true}
      />

      <TextField
        value={props.confirmNewPassword}
        id="confnew-password"
        floatingLabelText="Confirm New Password"
        onChange={props.onConfirmNewPasswordChange}
        type="password"
        fullWidth={true}
      />
    </div>
  </Dialog>
);

ChangePasswordDialog.propTypes = {
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
  oldPassword: React.PropTypes.string,
  newPassword: React.PropTypes.string,
  confirmNewPassword: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  onOldPasswordChange: React.PropTypes.func,
  onNewPasswordChange: React.PropTypes.func,
  onConfirmNewPasswordChange: React.PropTypes.func,
};

export default ChangePasswordDialog;
