import React from 'react';
import AppBar from 'material-ui/AppBar';

import './App.css';

const App = () => (
  <div className="App">
    <AppBar
      title="WLANturn"
      showMenuIconButton={false}
    />

    <div className="App-Body">
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-4" />
        <div className="col-xs-12 col-md-6 col-lg-8" />
      </div>
    </div>
  </div>
);

export default App;
