import { FETCH_CUSTOMERS_SUCCESS } from '../actionTypes';

const createCustomersObj = dataList => dataList.reduce( (acc,customer) => {
    const customerId = customer.customer_id;
    acc[customerId] = customer;
    return acc;
}, {});
const byId = (state = {},action) => {
    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return createCustomersObj(action.data);
    default:
        return state;
    }
};
export const getCustomerById = (id, state) => state[id];
export default byId;