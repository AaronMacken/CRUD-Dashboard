import { 
    ADD_CHECKBOX_VALUE,
    UPDATE_CHECKBOX_VALUE,
    UPDATE_HEADER_CHECKBOX_VALUE,
    DELETE_CHECKBOX_VALUE 
} from './checkboxActionTypes';

const initialState = {
    checkboxValues: new Map(),
    checkboxesPendingDelete: new Set(),
    isHeaderChecked: false
}

const checkboxReducer = (state = initialState, action = {}) => {
    const { checkboxId } = action;
    const { checkboxValues, checkboxesPendingDelete } = state;
    
    switch(action.type) {
        case ADD_CHECKBOX_VALUE:
            const addValuesCopy = new Map(checkboxValues);

            addValuesCopy.set(checkboxId, false);

            return { ...state, checkboxValues: addValuesCopy };

        case UPDATE_CHECKBOX_VALUE:
            const updateValuesCopy = new Map(checkboxValues);
            const updatePendingDeleteCopy = new Set(checkboxesPendingDelete);
            const toggledIsCheckedValue = !updateValuesCopy.get(checkboxId);

            updateValuesCopy.set(checkboxId, toggledIsCheckedValue);
            toggledIsCheckedValue 
                ? updatePendingDeleteCopy.add(checkboxId) 
                : updatePendingDeleteCopy.delete(checkboxId)

            return { ...state, checkboxValues: updateValuesCopy, checkboxesPendingDelete: updatePendingDeleteCopy };

        case UPDATE_HEADER_CHECKBOX_VALUE:
            return { ...state, isHeaderChecked: action.isChecked };

        case DELETE_CHECKBOX_VALUE:
            const deleteValuesCopy = new Map(checkboxValues);
            const deletePendingCopy = new Set(checkboxesPendingDelete)

            deleteValuesCopy.delete(checkboxId)
            deletePendingCopy.delete(checkboxId);

            return { 
                ...state, 
                checkboxValues: deleteValuesCopy, 
                checkboxesPendingDelete: deletePendingCopy 
            };

        default:
        return state;
    }
};
    
export default checkboxReducer;
    