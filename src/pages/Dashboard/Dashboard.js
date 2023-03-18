import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';


import Table from '../../components/Table';
import TableFilters from '../../components/TableFilters';

import { fetchOrders } from '../../services/OrderService';

import { addCheckboxValue } from '../../redux/checkboxActions';

// endpoint documentation https://red-candidate-web.azurewebsites.net/index.html

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

  return (
    <>
      <TableFilters 
        onCreateOrder={handleCreateOrder}
        onDeleteOrders={handleDeleteOrders}
        onOrderIdInputChange={setOrderIdFilter}
        onOrderTypeChange={setOrderTypeFilter} />
      <Table
        orderIdFilter={orderIdFilter}
        orderTypeFilter={orderTypeFilter}
        rows={rows} />
    </>
  );
}

export default connect(null, { addCheckboxValue })(Dashboard);

// TODO: Filter responsiveness - Saturday
// TODO: Prop types - Saturday
// TODO: Unit Tests - Saturday
// TODO: TypeScript Attempt - Saturday
// TODO: create-react-app heroku deploy - Saturday