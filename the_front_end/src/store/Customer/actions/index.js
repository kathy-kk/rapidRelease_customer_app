import customerService from '../../../service';
import { REMOVE_CUSTOMER, SHOW_CUSTOMER_DETAIL, FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE } from '../actionTypes';


export const fetchCustomers = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
        });
        try{
            const data = await customerService.fetchCustomers();
            dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                data
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: FETCH_CUSTOMERS_FAILURE,
                error:error.message||'fail to fetch customers'
            });
        }
    };
};

// export const removeCustomer = (email) => {
//     return async dispatch => {
//         try{
//             const removedCustomer = await customerService.removeCustomer(email);
//             dispatch({
//                 type: REMOVE_CUSTOMER,
//                 id: removedCustomer.customerId
//             });
//         }catch(error){
//             console.log(error);
//         }
//     };
// };

// export const showCustomerDetail = customerId => (
//     {
//         type: SHOW_CUSTOMER_DETAIL,
//         id: customerId
//     }
// );