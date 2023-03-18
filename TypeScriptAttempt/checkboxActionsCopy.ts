import {
  ADD_CHECKBOX_VALUE,
  UPDATE_CHECKBOX_VALUE,
  UPDATE_HEADER_CHECKBOX_VALUE,
  DELETE_CHECKBOX_VALUE,
} from "../src/redux/checkboxActions.js";

interface HandleAdd {
  type: string;
  checkboxId: string;
}

interface HandleUpdate {
  type: string;
  checkboxId: string;
}

interface HandleDelete {
  type: string;
  checkboxId: string;
}

interface HandleUpdateHeader {
  type: string;
  isChecked: boolean;
}

const handleAdd = (checkboxId: string): HandleAdd => ({ type: ADD_CHECKBOX_VALUE, checkboxId });

const handleUpdate = (checkboxId: string): HandleUpdate => ({
  type: UPDATE_CHECKBOX_VALUE,
  checkboxId,
});

const handleDelete = (checkboxId: string): HandleDelete => ({
  type: DELETE_CHECKBOX_VALUE,
  checkboxId,
});

const handleUpdateHeader = (isChecked: boolean): HandleUpdateHeader => ({
  type: UPDATE_HEADER_CHECKBOX_VALUE,
  isChecked,
});

export const addCheckboxValue = (checkboxId: string) => {
  return (dispatch) => {
    return dispatch(handleAdd(checkboxId));
  };
};

export const updateCheckboxValue = (checkboxId) => {
  return (dispatch) => {
    return dispatch(handleUpdate(checkboxId));
  };
};

export const deleteCheckboxValue = (checkboxId) => {
  return (dispatch) => {
    return dispatch(handleDelete(checkboxId));
  };
};

export const updateHeaderCheckboxValue = (isChecked) => {
  return (dispatch) => {
    return dispatch(handleUpdateHeader(isChecked));
  };
};
