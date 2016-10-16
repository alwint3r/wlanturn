import React from 'react';
import AppBar from 'material-ui/AppBar';

import './App.css';
import AccessPoints from './AccessPoints';
import ActiveConnection from './ActiveConnection';

const App = () => (
  <div className="App">
    <AppBar
      title="WLANturn"
      showMenuIconButton={false}
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
  </div>
);

export default App;
