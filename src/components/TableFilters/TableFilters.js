import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

import Modal from '../Modal';

import { OrderTypes } from '../../constants';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1rem',
    columnGap: '20px'
  },
  orderType: {
    width: 200
  }
})

const TableFilters = ({ onCreateOrder, onOrderIdInputChange, onOrderTypeChange }) => {
  const [ orderIdInput, setOrderIdInput ] = useState('');
  const [ orderType, setOrderType ] = useState('');
  const [ isModalShowing, setIsModalShowing ] = useState(false);

  const handleOrderIdInputChange = ({ target: { value }}) => {
    setOrderIdInput(value);
    
    return onOrderIdInputChange(value);
  }

  const handleOrderTypeChange = ({ target: { value }}) => {
    setOrderType(value);
    
    return onOrderTypeChange(value);
  }

  const renderOrderIdInput = () => {
    return <TextField label="Order ID Search" variant="outlined" value={orderIdInput} onChange={handleOrderIdInputChange} />;
  }

  const renderModal = () => <Modal isModalShowing={isModalShowing} onCreateOrder={onCreateOrder} onToggleModal={setIsModalShowing} />;

  const renderCreateButton = () => {
    return (
      <Button
        size="large"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => setIsModalShowing(true)}>
        Create Order
      </Button>
    );
  }

  const renderDeleteButton = () => {
    return (
      <Button
        size="large"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => console.log('delete logic')}>
        Delete Selected
      </Button>
    );
  }

  const renderOrderTypeInput = () => {
    return (
      <TextField
        className={classes.orderType}
        label="Order Type"
        select
        value={orderType}
        variant="outlined"
        onChange={handleOrderTypeChange}>
        <MenuItem value={''}>All</MenuItem>
        <MenuItem value={OrderTypes.STANDARD}>Standard</MenuItem>
        <MenuItem value={OrderTypes.RETURN_ORDER}>Return Order</MenuItem>
        <MenuItem value={OrderTypes.TRANSFER_ORDER}>Transfer Order</MenuItem>
        <MenuItem value={OrderTypes.SALE_ORDER}>Sale Order</MenuItem>
        <MenuItem value={OrderTypes.PURCHASE_ORDER}>Purchase Order</MenuItem>
      </TextField>
    );
  }

  const classes = useStyles();

  const OrderIdInput = renderOrderIdInput();
  const CreateOrderModal = renderModal();
  const CreateButton = renderCreateButton();
  const DeleteButton = renderDeleteButton();
  const OrderTypeInput = renderOrderTypeInput();

  return (
    <div className={classes.wrapper}>
      { CreateOrderModal }
      { OrderIdInput }
      { CreateButton }
      { DeleteButton }
      { OrderTypeInput }
    </div>
  )
}

export default TableFilters