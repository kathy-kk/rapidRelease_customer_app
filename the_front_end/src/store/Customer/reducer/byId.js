import { FETCH_CUSTOMERS_SUCCESS, ADD_CUSTOMER, MODIFY_CUSTOMER, REMOVE_CUSTOMER } from '../actionTypes';
import { formatDatetoString } from '../../../utils/helper';

const createCustomersObj = dataList => dataList.reduce( (acc,customer) => {
    const customerId = customer.customer_id;
    customer.date_of_birth = formatDatetoString(customer.date_of_birth);
    acc[customerId] = customer;
    return acc;
}, {});


const byId = (state = {},action) => {
    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return createCustomersObj(action.data);
    case ADD_CUSTOMER:{
        const newCustomer = action.newCustomer;
        newCustomer.date_of_birth = formatDatetoString(newCustomer.date_of_birth);
        return {
            ...state,
            [newCustomer.customer_id]: newCustomer
        };
    }
    case REMOVE_CUSTOMER:{
        const id = action.id;
        return {
            ...state,
            [id]: undefined
        };
    }
    case MODIFY_CUSTOMER:{
        const updatedCustomer = action.customer;
        updatedCustomer.date_of_birth = formatDatetoString(updatedCustomer.date_of_birth);
        return {
            ...state,
            [updatedCustomer.customer_id]: updatedCustomer
        };
    }
    default:
        return state;
    }
};
export const getCustomerById = (id, state) => state[id];
export default byId;