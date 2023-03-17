import React, { useEffect, useState } from 'react';

import Table from '../../components/Table';
import TableFilters from '../../components/TableFilters';

import { fetchOrders } from '../../services/OrderService';

// endpoint documentation https://red-candidate-web.azurewebsites.net/index.html

// TODO: Loading logic
export default function DataTable() {
  const [ rows, setRows ] = useState([]);
  const [ orderIdFilter, setOrderIdFilter ] = useState('');
  const [ orderTypeFilter, setOrderTypeFilter ] = useState('');

  useEffect(() => {
      fetchOrders().then(orderData => setRows(orderData));
  }, []);

  const handleCreateOrder = newOrder => {
    setRows([...rows, newOrder ]);
  }

  return (
    <>
      <TableFilters 
        onCreateOrder={handleCreateOrder}
        onOrderIdInputChange={setOrderIdFilter}
        onOrderTypeChange={setOrderTypeFilter} />
      <Table
        orderIdFilter={orderIdFilter}
        orderTypeFilter={orderTypeFilter}
        rows={rows} />
    </>
  );
}

// TODO: checkbox logic
// 
// .MuiDataGrid-cellCheckbox	