import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './App.css';
import AccessPoints from './AccessPoints';
import ActiveConnection from './ActiveConnection';
import ConnectDialog from './ConnectDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import actions from './actions';

class App extends React.Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.login();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedIn) {
      this.props.login();
    }
  }

  render() {
    return (
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
                onTouchTap={this.props.changePasswordShow}
              />
              <MenuItem
                primaryText="Log Out"
                onTouchTap={this.props.logout}
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

        <ConnectDialog open={this.props.connectDialogOpen} />
        <ChangePasswordDialog open={this.props.changePasswordDialogOpen} />
        <Snackbar
          open={this.props.snackbarOpen}
          message={this.props.snackbarMsg}
          onRequestClose={this.props.snackbarClose}
          autoHideDuration={1000}
        />
      </div>
    );
  }
}

App.propTypes = {
  connectDialogOpen: React.PropTypes.bool,
  changePasswordDialogOpen: React.PropTypes.bool,
  changePasswordShow: React.PropTypes.func,
  loggedIn: React.PropTypes.bool,
  logout: React.PropTypes.func,
  login: React.PropTypes.func,
  snackbarOpen: React.PropTypes.bool,
  snackbarMsg: React.PropTypes.string,
  snackbarClose: React.PropTypes.func,
};

const mapStateToProps = state => ({
  connectDialogOpen: state.connectDialogOpen,
  changePasswordDialogOpen: state.changePasswordDialogOpen,
  loggedIn: state.loggedIn,
  snackbarMsg: state.snackbar.message,
  snackbarOpen: state.snackbar.open,
});

const mapDispatchToProps = dispatch => ({
  changePasswordShow() {
    dispatch(actions.toggleChangePassDialog());
  },

  logout() {
    dispatch(actions.logout());
  },

  login() {
    dispatch(push(`/login`));
  },

  snackbarClose() {
    dispatch(actions.closeSnackbar());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
