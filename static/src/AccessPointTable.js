import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './App.css';

/* eslint react/jsx-boolean-value:0 */


const AccessPointTable = props => (
  <Table onCellClick={props.onRowSelection}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>SSID</TableHeaderColumn>
        <TableHeaderColumn>Freq</TableHeaderColumn>
        <TableHeaderColumn>Security</TableHeaderColumn>
        <TableHeaderColumn>Rate</TableHeaderColumn>
        <TableHeaderColumn>Signal</TableHeaderColumn>
        <TableHeaderColumn>Active</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.access_points.map(ap => (
        <TableRow key={`${ap.ssid}-${Date.now}`}>
          <TableRowColumn>{ap.ssid}</TableRowColumn>
          <TableRowColumn>{ap.freq}</TableRowColumn>
          <TableRowColumn>{ap.security}</TableRowColumn>
          <TableRowColumn>{ap.rate}</TableRowColumn>
          <TableRowColumn>{ap.signal}</TableRowColumn>
          <TableRowColumn>{ap.active}</TableRowColumn>
        </TableRow>
    ))}
    </TableBody>
  </Table>
);

AccessPointTable.propTypes = {
  onRowSelection: React.PropTypes.func,
  access_points: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default AccessPointTable;
