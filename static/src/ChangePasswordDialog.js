import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import actions from './actions';

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

const mapStateToProps = state => ({
  oldPassword: state.changePassword.oldPassword,
  newPassword: state.changePassword.newPassword,
  confirmNewPassword: state.changePassword.confirmNewPassword,
});

const mapDispatchToProps = dispatch => ({
  handleClose() {
    dispatch(actions.toggleChangePassDialog());
  },
  onOldPasswordChange(event) {
    dispatch(actions.changePassFieldChange(`oldPassword`, event.target.value));
  },
  onNewPasswordChange(event) {
    dispatch(actions.changePassFieldChange(`newPassword`, event.target.value));
  },
  onConfirmNewPasswordChange(event) {
    dispatch(actions.changePassFieldChange(`confirmNewPassword`, event.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordDialog);
