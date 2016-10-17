import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import './App.css';
import AccessPointTable from './AccessPointTable';
import actions from './actions';

/* eslint react/jsx-boolean-value:0 */
class AccessPoints extends React.Component {
  componentWillMount() {
    this.props.doRescan();
  }

  render() {
    return (
      <Paper zDepth={1}>
        <div className="paper-inner">
          <h3> Available Access Point(s) </h3>
          <div style={{ marginBottom: 10, textAlign: `right` }}>
            <RaisedButton label="Re-scan" primary={true} onTouchTap={this.props.doRescan} />
          </div>

          <AccessPointTable
            onRowSelection={this.props.handleSelection}
            style={{ marginTop: 15 }}
            access_points={this.props.access_points}
          />
        </div>
      </Paper>
    );
  }
}

AccessPoints.propTypes = {
  handleSelection: React.PropTypes.func,
  access_points: React.PropTypes.arrayOf(React.PropTypes.object),
  doRescan: React.PropTypes.func,
};

const mapStateToProps = state => ({
  access_points: state.access_points,
});

const mapDispatchToProps = dispatch => ({
  handleSelection(idx) {
    dispatch(actions.toggleConnectDialog(idx));
  },

  doRescan() {
    dispatch(actions.rescan());
    dispatch(actions.getActiveConnections());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessPoints);
