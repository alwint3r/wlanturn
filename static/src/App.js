import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

import './App.css';
import AccessPoints from './AccessPoints';
import ActiveConnection from './ActiveConnection';
import ConnectDialog from './ConnectDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import actions from './actions';

const App = (props) => (
  <div className="App">
    <AppBar
      title="WLANturn"
      showMenuIconButton={false}
      iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: `right`, vertical: `top` }}
          anchorOrigin={{ horizontal: `right`, vertical: `top` }}
        >
          <MenuItem
            primaryText="Change Password"
            onTouchTap={props.changePasswordShow}
          />
          <MenuItem
            primaryText="Log Out"
            onTouchTap={props.logout}
          />
        </IconMenu>
      }
    />

    <div className="App-Body">
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-4">
          <ActiveConnection />
        </div>
        <div className="col-xs-12 col-md-6 col-lg-8">
          <AccessPoints />
        </div>
      </div>
    </div>

    <ConnectDialog open={props.connectDialogOpen} />
    <ChangePasswordDialog open={props.changePasswordDialogOpen} />
  </div>
);

App.propTypes = {
  connectDialogOpen: React.PropTypes.bool,
  changePasswordDialogOpen: React.PropTypes.bool,
  changePasswordShow: React.PropTypes.func,
  logout: React.PropTypes.func,
};

const mapStateToProps = state => ({
  connectDialogOpen: state.connectDialogOpen,
  changePasswordDialogOpen: state.changePasswordDialogOpen,
});

const mapDispatchToProps = dispatch => ({
  changePasswordShow() {
    dispatch(actions.toggleChangePassDialog());
  },

  logout() {
    dispatch(actions.logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
