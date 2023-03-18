import checkboxReducer from './checkboxReducer';

import { 
    ADD_CHECKBOX_VALUE,
    UPDATE_CHECKBOX_VALUE,
    UPDATE_HEADER_CHECKBOX_VALUE,
    DELETE_CHECKBOX_VALUE 
} from './checkboxActionTypes';

describe('checkboxReducer:', () => {
    const defaultValues = checkboxReducer();

    it('should create an object with default state values', () => {
        const mockValues = {
            checkboxValues: new Map(),
            checkboxesPendingDelete: new Set(),
            isHeaderChecked: false
        };

        expect(defaultValues).toEqual(mockValues);
    });

    describe('ADD_CHECKBOX_VALUE', () => {
        it('should add a new key value pair into the `checkboxValues` map', () => {
            const updatedState = checkboxReducer(defaultValues, { type: ADD_CHECKBOX_VALUE, checkboxId: 'abc123' });
            const mockMap = new Map();
            mockMap.set('abc123', false);
        
            expect(updatedState.checkboxValues).toEqual(mockMap);
        });
    });

    describe('UPDATE_CHECKBOX_VALUE', () => {
        it('should update the value of the given checkbox, and add the checkbox ID into the `checkboxesPendingDelete` set', () => {
            const updatedState = checkboxReducer(defaultValues, { type: ADD_CHECKBOX_VALUE, checkboxId: 'abc123' });
            const { checkboxValues, checkboxesPendingDelete } = checkboxReducer(updatedState, { type: UPDATE_CHECKBOX_VALUE, checkboxId: 'abc123' });

            const mockMap = new Map();
            const mockSet = new Set();

            mockMap.set('abc123', true);
            mockSet.add('abc123');
        
            expect(checkboxValues).toEqual(mockMap);
            expect(checkboxesPendingDelete).toEqual(mockSet);
        });
    });

    describe('UPDATE_HEADER_CHECKBOX_VALUE', () => {
        it('should set `isHeaderChecked` to `true`', () => {
            const { isHeaderChecked } = checkboxReducer(defaultValues, { type: UPDATE_HEADER_CHECKBOX_VALUE, isChecked: true });
    
            expect(isHeaderChecked).toEqual(true);
        });
    });

    describe('DELETE_CHECKBOX_VALUE', () => {
        it('should remove the checkbox from the `checkboxValues` map and the `checkbocesPendingDelete` set', () => {
            const updatedState = checkboxReducer(defaultValues, { type: ADD_CHECKBOX_VALUE, checkboxId: 'abc123' });
            const secondStateUpdate = checkboxReducer(updatedState, { type: UPDATE_CHECKBOX_VALUE, checkboxId: 'abc123' });
            const { checkboxValues, checkboxesPendingDelete } = checkboxReducer(secondStateUpdate, { type: DELETE_CHECKBOX_VALUE, checkboxId: 'abc123' });
            const mockMap = new Map();
            const mockSet = new Set();

        
            expect(checkboxValues).toEqual(mockMap);
            expect(checkboxesPendingDelete).toEqual(mockSet);
        });
    });
});