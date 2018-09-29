import { SHOW_CUSTOMER_DETAIL } from '../actionTypes';

const initialState = {
    selectedCustomer: null,
    edit: false
};
const app = (state = initialState, action) => {
    switch (action.type) {
    case SHOW_CUSTOMER_DETAIL:
        return {
            ...state,
            selectedCustomer: action.id
        };
    default:
        return state;
    }
};
export default app;
export const getSelectedCustomer = state => state.selectedCustomer;
export const getEdit = state => state.edit;

