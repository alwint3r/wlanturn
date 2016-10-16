import React from 'react';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import './App.css';

/* eslint react/jsx-boolean-value:0 */


const AccessPointTable = (props) => (
  <Table onRowSelection={props.onRowSelection}>
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
    <TableRow>
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
  onRowSelection: React.PropTypes.function,
  access_points: React.PropTypes.array,
};

export default AccessPointTable;
