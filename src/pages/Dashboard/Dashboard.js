import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../../components/Table';
import TableFilters from '../../components/TableFilters';

import { fetchOrders } from '../../services/OrderService';
import { addCheckboxValue } from '../../redux/checkboxActions';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2)
  }
}));

// TODO: Loading logic
function Dashboard({ addCheckboxValue }) {
  const [ rows, setRows ] = useState([]);
  const [ orderIdFilter, setOrderIdFilter ] = useState('');
  const [ orderTypeFilter, setOrderTypeFilter ] = useState('');

  useEffect(() => {
      fetchOrders().then(orderData => {
        setRows(orderData);
        orderData.forEach(({ orderId }) => addCheckboxValue(orderId))
      });
  }, [addCheckboxValue]);

  const handleCreateOrder = newOrder => {
    addCheckboxValue(newOrder.orderId);
    setRows([...rows, newOrder ]);
  }

  const handleDeleteOrders = ordersToDelete => {
    const remainingRows = rows.filter(row => (
      !ordersToDelete.includes(row.orderId)
    ));

    setRows(remainingRows);
  }

  const classes = useStyles();

  return (
    <Grid className={classes.grid} container>
      <Grid item xs={12}>

      <TableFilters 
        onCreateOrder={handleCreateOrder}
        onDeleteOrders={handleDeleteOrders}
        onOrderIdInputChange={setOrderIdFilter}
        onOrderTypeChange={setOrderTypeFilter} />
      <Table
        orderIdFilter={orderIdFilter}
        orderTypeFilter={orderTypeFilter}
        rows={rows} />
      </Grid>
    </Grid>
  );
}

export default connect(null, { addCheckboxValue })(Dashboard);

Dashboard.propTypes = {
  addCheckboxValue: PropTypes.func.isRequired
}
