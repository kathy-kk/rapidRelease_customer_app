import { combineReducers } from 'redux';
import { FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE, FETCH_CUSTOMERS_REQUEST } from '../actionTypes';

const createList = () => {
    const createIdList = dataList => dataList.map(customer => customer.customer_id);

    const idList = (state = [], action) => {
        switch(action.type){
        case FETCH_CUSTOMERS_SUCCESS:
            return createIdList(action.data);
        default: return state;
        }
    };
    const isLoading = (state = false, action) => {
        switch (action.type){
        case FETCH_CUSTOMERS_REQUEST:
            return true;
        case FETCH_CUSTOMERS_SUCCESS:
            return false;
        case FETCH_CUSTOMERS_FAILURE:
            return false;
        default:
            return state;
        }
    };
    const errorMessage = (state = '', action) => {
        switch (action.type){
        case FETCH_CUSTOMERS_FAILURE:
            return action.error;
        case FETCH_CUSTOMERS_SUCCESS:
            return '';
        default:
            return state;
        }
    };
    return combineReducers({
        idList,
        isLoading,
        errorMessage
    });
};
export default createList;
export const getIsLoading = state => state.isLoading;
export const getIdList = state => state.idList;