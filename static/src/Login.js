import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import actions from './actions';

/* eslint react/jsx-boolean-value:0 */

class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('Receiving', nextProps);
    if (nextProps.loggedIn) {
      this.props.changePage(push(`/`));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
          <Paper zDepth={1} className="login-form" style={{ padding: 30 }}>
            <div className="group" style={{ textAlign: `center` }}>
              <h2>Log In | WLANturn</h2>
            </div>
            <div className="group">
              <TextField
                id="username"
                value={this.props.login.username}
                onChange={this.props.onUsernameChange}
                fullWidth={true}
                floatingLabelText="Username"
              />

              <TextField
                id="password"
                value={this.props.login.password}
                onChange={this.props.onPasswordChange}
                fullWidth={true}
                floatingLabelText="Password"
                type="password"
              />
            </div>

            <div className="group">
              <RaisedButton
                label="Log In"
                primary={true}
                fullWidth={true}
                onTouchTap={this.props.handleSubmit}
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.objectOf(React.PropTypes.string),
  onUsernameChange: React.PropTypes.func,
  onPasswordChange: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  changePage: React.PropTypes.func,
};

const mapStateToProps = state => ({
  login: state.login,
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit() {
    dispatch(actions.loginFormSubmit());
  },

  onPasswordChange(event) {
    dispatch(actions.loginFormFieldChange(`password`, event.target.value));
  },

  onUsernameChange(event) {
    dispatch(actions.loginFormFieldChange(`username`, event.target.value));
  },

  changePage(pageEvent) {
    dispatch(pageEvent);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
