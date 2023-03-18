import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BaseModal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import UploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { createOrder } from '../../services/OrderService';

import { OrderTypes } from '../../constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: '9px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    },
    marginRight: {
        marginRight: theme.spacing(1),
    },
    marginBottom: {
        marginBottom: theme.spacing(2)
    },
}));

export default function Modal({ isModalShowing, onCreateOrder, onToggleModal }) {
  const [ nameInput, setNameInput ] = useState('');
  const [ orderType, setOrderType ] = useState('');

  const isFormError = !nameInput.length || !orderType.length;

  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
        orderType,
        customerName: nameInput,
        createdByUserName: 'Aaron'
    };

    if (!isFormError) {
        const newOrder = await createOrder(payload);

        setNameInput('');
        setOrderType('');
    
        onToggleModal(false);
        return onCreateOrder(newOrder);
    }
  }

  const renderNameInput = () => {
    return <TextField 
        className={classes.marginBottom} 
        fullWidth
        required
        label="Full Name" 
        variant="outlined" 
        value={nameInput}
        onChange={({ target: { value }}) => setNameInput(value)} />;
  }

  const renderOrderTypeInput = () => {
    return (
      <TextField
        className={classes.marginBottom}
        fullWidth
        required
        label="Order Type"
        select
        value={orderType}
        variant="outlined"
        onChange={({ target: { value }}) => setOrderType(value)}>
        <MenuItem value={OrderTypes.STANDARD}>Standard</MenuItem>
        <MenuItem value={OrderTypes.RETURN_ORDER}>Return Order</MenuItem>
        <MenuItem value={OrderTypes.TRANSFER_ORDER}>Transfer Order</MenuItem>
        <MenuItem value={OrderTypes.SALE_ORDER}>Sale Order</MenuItem>
        <MenuItem value={OrderTypes.PURCHASE_ORDER}>Purchase Order</MenuItem>
      </TextField>
    );
  }

  const renderContinueButtons = () => {
    return (
        <form onSubmit={handleSubmit}>
            <Button
                size="large"
                variant="outlined"
                className={classes.marginRight}
                startIcon={<EditIcon />}
                onClick={() => onToggleModal(false)}>
                Save Draft
            </Button>
            <Button
                color="primary"
                className={classes.create}
                disabled={isFormError}
                size="large"
                variant="contained"
                type="submit"
                endIcon={<UploadIcon />}>
                Submit
            </Button>
        </form>
    );
  }

  const NameInput = renderNameInput();
  const OrderTypeInput = renderOrderTypeInput();
  const ContinueButtons = renderContinueButtons();

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Create Order</h2>
      { NameInput }
      { OrderTypeInput }
      { ContinueButtons }
    </div>
  );

  return (
    <div>
      <BaseModal
        open={isModalShowing}
        onClose={() => onToggleModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        { body }
      </BaseModal>
    </div>
  );
}

Modal.propTypes = {
  isModalShowing: PropTypes.bool.isRequired,
  onCreateOrder: PropTypes.func.isRequired, 
  onToggleModal: PropTypes.func.isRequired
}