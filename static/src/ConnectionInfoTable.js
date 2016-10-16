import React from 'react';

const ConnectionInfoTable = props => (
  <table className="connection-info">
    <tbody>
      <tr>
        <td>Name</td>
        <td>{props.name}</td>
      </tr>
      <tr>
        <td>Interface</td>
        <td>{props.interface}</td>
      </tr>
      <tr>
        <td>IP Address</td>
        <td>{props.ip}</td>
      </tr>
    </tbody>
  </table>
);

ConnectionInfoTable.propTypes = {
  name: React.PropTypes.string,
  interface: React.PropTypes.string,
  ip: React.PropTypes.string,
};

export default ConnectionInfoTable;
