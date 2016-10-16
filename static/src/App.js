import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import './App.css';
import AccessPoints from './AccessPoints';
import ActiveConnection from './ActiveConnection';
import ConnectDialog from './ConnectDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

const App = props => (
  <div className="App">
    <AppBar
      title="WLANturn"
      showMenuIconButton={false}
      iconElementRight={
        <IconMenu
          {...props}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: `right`, vertical: `top` }}
          anchorOrigin={{ horizontal: `right`, vertical: `top` }}
        >
          <MenuItem primaryText="Change Password" />
          <MenuItem primaryText="Log Out" />
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
};

export default App;
