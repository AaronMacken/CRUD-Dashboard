import React from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import BaseTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { updateCheckboxValue, updateHeaderCheckboxValue } from '../../redux/checkboxActions';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900
  },
});

const Table = ({ 
  checkboxValues, 
  checkboxesPendingDelete, 
  isHeaderChecked, 
  rows, 
  orderIdFilter, 
  orderTypeFilter, 
  updateCheckboxValue, 
  updateHeaderCheckboxValue 
}) => {
  const getIsHeaderDisabled = () => {
    return checkboxesPendingDelete.size && !isHeaderChecked;
  }

  const getCheckboxValue = checkboxId => {
    return checkboxValues.get(checkboxId);
  }

  const handleCheckAll = () => {
    const checkboxKeys = [ ...checkboxValues.keys() ];

    if (!checkboxesPendingDelete.size) {
      updateHeaderCheckboxValue(true);
      checkboxKeys.forEach(key => updateCheckboxValue(key));
    }

    if (checkboxKeys.length === checkboxesPendingDelete.size) {
      updateHeaderCheckboxValue(false);
      checkboxKeys.forEach(key => updateCheckboxValue(key));
    }
  }

  const getRows = () => {
    const isTableFiltered = Boolean(orderIdFilter.length || orderTypeFilter.length);
    if (!isTableFiltered) {
        return rows;
    }

    return rows.filter((row) => {
        return row.orderId.includes(orderIdFilter) && (!orderTypeFilter || row.orderType === orderTypeFilter);
    });
  }

  const filteredRows = getRows();

  const renderTableHeaderContent = () => {
    const isTableEmpty = !filteredRows.length;
    return (
      <TableRow>
        { !isTableEmpty && <Checkbox onChange={handleCheckAll} checked={isHeaderChecked} disabled={getIsHeaderDisabled()} /> }
        <StyledTableCell>Order ID</StyledTableCell>
        <StyledTableCell align="left">Creation Date</StyledTableCell>
        <StyledTableCell align="left">Created By</StyledTableCell>
        <StyledTableCell align="left">Order Type</StyledTableCell>
        <StyledTableCell align="left">Customer</StyledTableCell>
      </TableRow>
    )
  }

  const renderTableContent = rows => {
    if (!rows.length) {
      return (
        <>
          <StyledTableCell component="th" scope="row">--</StyledTableCell>
          <StyledTableCell component="th" scope="row">--</StyledTableCell>
          <StyledTableCell component="th" scope="row">--</StyledTableCell>
          <StyledTableCell component="th" scope="row">--</StyledTableCell>
          <StyledTableCell component="th" scope="row">--</StyledTableCell>
        </>
      );
    }

    return (
      rows.map(({ orderId, orderType, customerName, createdDate, createdByUserName }) => (
        <StyledTableRow key={orderId}>
          <Checkbox checked={getCheckboxValue(orderId)} onChange={() => updateCheckboxValue(orderId)}/>
          <StyledTableCell component="th" scope="row">{orderId}</StyledTableCell>
          <StyledTableCell align="left">{createdDate}</StyledTableCell>
          <StyledTableCell align="left">{createdByUserName}</StyledTableCell>
          <StyledTableCell align="left">{orderType}</StyledTableCell>
          <StyledTableCell align="left">{customerName}</StyledTableCell>
        </StyledTableRow>
      ))
    );
  }

  const classes = useStyles();
  const TableHeaderContent = renderTableHeaderContent();
  const TableContent = renderTableContent(filteredRows);

  return (
    <TableContainer component={Paper}>
      <BaseTable className={classes.table} aria-label="customized table">
        <TableHead>
          { TableHeaderContent }
        </TableHead>
        <TableBody>
          { TableContent }
        </TableBody>
      </BaseTable>
    </TableContainer>
  )
}

Table.propTypes = {}

const mapStateToProps = ({ checkboxReducer: { checkboxValues, checkboxesPendingDelete, isHeaderChecked }}) => ({
  checkboxValues,
  checkboxesPendingDelete,
  isHeaderChecked
});

export default connect(mapStateToProps, { updateCheckboxValue, updateHeaderCheckboxValue })(Table);
