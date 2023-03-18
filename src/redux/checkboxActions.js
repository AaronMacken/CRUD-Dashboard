import { 
    ADD_CHECKBOX_VALUE, 
    UPDATE_CHECKBOX_VALUE,
    UPDATE_HEADER_CHECKBOX_VALUE,
    DELETE_CHECKBOX_VALUE 
} from './checkboxActionTypes';

const handleAdd = checkboxId => ({ type: ADD_CHECKBOX_VALUE, checkboxId });
const handleUpdate = checkboxId => ({ type: UPDATE_CHECKBOX_VALUE, checkboxId });
const handleUpdateHeader = isChecked => ({ type: UPDATE_HEADER_CHECKBOX_VALUE, isChecked });
const handleDelete = checkboxId => ({ type: DELETE_CHECKBOX_VALUE, checkboxId });

export const addCheckboxValue = checkboxId => {
    return dispatch => {
        return dispatch(handleAdd(checkboxId));
    }
}

export const updateCheckboxValue = checkboxId => {
    return dispatch => {
        return dispatch(handleUpdate(checkboxId));
    }
}

export const updateHeaderCheckboxValue = isChecked => {
    return dispatch => {
        return dispatch(handleUpdateHeader(isChecked));
    }
}

export const deleteCheckboxValue = checkboxId => {
    return dispatch => {
        return dispatch(handleDelete(checkboxId));
    }
}
