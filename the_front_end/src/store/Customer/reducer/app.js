import { SHOW_CUSTOMER_DETAIL, TOGGLE_EDIT, ADD_CUSTOMER, RESET_SELECTED_CUSTOMER, FAIL_TO_ADD, VALIDATION_SUCCESS, FAIL_TO_MODIFY } from '../actionTypes';
import { combineReducers } from 'redux';
import edit, * as fromEdit from './edit';

const selectedCustomer = (state = null, action) => {
    switch (action.type) {
    case RESET_SELECTED_CUSTOMER:
        return null;
    case SHOW_CUSTOMER_DETAIL:
        return action.id;
    default:
        return state;
    }
};

const validationError = (state = '', action) => {
    switch (action.type) {
    case VALIDATION_SUCCESS:
        return '';
    case FAIL_TO_ADD:
        return action.errorMessage;
    case FAIL_TO_MODIFY:
        return action.errorMessage;
    default:
        return state;
    }
};
export default combineReducers({selectedCustomer, edit, validationError});
export const getSelectedCustomer = state => state.selectedCustomer;
export const getEdit = state => fromEdit.getEdit(state.edit);
export const getEditMode = state => fromEdit.getEditMode(state);
export const getValidationError = state => state.validationError;

