import { ADD_CHECKBOX_VALUE, UPDATE_CHECKBOX_VALUE, UPDATE_HEADER_CHECKBOX_VALUE, DELETE_CHECKBOX_VALUE, } from "../src/redux/checkboxActions.js";
const handleAdd = (checkboxId) => ({ type: ADD_CHECKBOX_VALUE, checkboxId });
const handleUpdate = (checkboxId) => ({
    type: UPDATE_CHECKBOX_VALUE,
    checkboxId,
});
const handleDelete = (checkboxId) => ({
    type: DELETE_CHECKBOX_VALUE,
    checkboxId,
});
const handleUpdateHeader = (isChecked) => ({
    type: UPDATE_HEADER_CHECKBOX_VALUE,
    isChecked,
});
export const addCheckboxValue = (checkboxId) => {
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
