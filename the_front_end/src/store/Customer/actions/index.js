import customerService from '../../../service';
import { getEdit ,getSelectedCustomer } from '../reducer/';
import { REMOVE_CUSTOMER, SHOW_CUSTOMER_DETAIL, FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE, ADD_CUSTOMER, TOGGLE_EDIT, RESET_SELECTED_CUSTOMER, FAIL_TO_ADD, VALIDATION_SUCCESS, FAIL_TO_MODIFY, MODIFY_CUSTOMER } from '../actionTypes';

export const fetchCustomers = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
        });
        try{
            const responseData = await customerService.fetchCustomers();
            dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                data:responseData
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


export const failToAddCustomer = (errorMessage) => (dispatch) => {
    dispatch({
        type: FAIL_TO_ADD,
        errorMessage
    });
};

export const failToModifyCustomer = (errorMessage) => (dispatch) => {
    dispatch({
        type: FAIL_TO_MODIFY,
        errorMessage
    });
};

export const modifyCustomer = (customer_id, name, date_of_birth, email, phone) => {
    return async dispatch => {
        dispatch({type: VALIDATION_SUCCESS});
        try{
            const id = customer_id;
            const customer = {name, date_of_birth, email, phone};
            const response = await customerService.modifyCustomer(id, customer);
            dispatch({
                type: MODIFY_CUSTOMER,
                customer: response.customer
            });

            dispatch({
                type: SHOW_CUSTOMER_DETAIL,
                id: response.customer.customer_id
            });
        }catch(error){
            console.log(error);
            if( error.message == 'duplicate email')
                dispatch({
                    type: FAIL_TO_MODIFY,
                    errorMessage: 'email already exists.'
                });
            else{
                dispatch({
                    type: FAIL_TO_MODIFY,
                    errorMessage: 'Fail to modify customer.'
                }); 
            }
        }
    };
};

export const editExistingCustomer = () => (dispatch, getState) => {
    dispatch({
        type: VALIDATION_SUCCESS
    });
    const selectedCustomer = getSelectedCustomer(getState());
    const edit = getEdit(getState());
    if(selectedCustomer!==null && !edit)
        dispatch({
            type: TOGGLE_EDIT,
            mode:'modify'
        });
}; 

export const editNewCustomer = () => dispatch => {
    dispatch({
        type: VALIDATION_SUCCESS
    });
    dispatch({
        type: RESET_SELECTED_CUSTOMER
    });
    dispatch({
        type: TOGGLE_EDIT,
        mode:'add'
    });
};

export const addCustomer = (name, date_of_birth, email, phone) => {
    return async dispatch => {
        dispatch({type: VALIDATION_SUCCESS});

        try{
            const response = await customerService.addCustomer(name, date_of_birth, email, phone);
            const newCustomer = response.customer[0];
            dispatch({
                type: ADD_CUSTOMER,
                newCustomer
            });
            dispatch({
                type: SHOW_CUSTOMER_DETAIL,
                id: newCustomer.customer_id
            });
        }catch(error){
            if( error.message == 'duplicate email')
                dispatch({
                    type: FAIL_TO_ADD,
                    errorMessage: 'Customer already exists.'
                });
            else{
                dispatch({
                    type: FAIL_TO_ADD,
                    errorMessage: 'Fail to add customer.'
                }); 
            }
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

export const showCustomerDetail = customerId => dispatch => {
    dispatch({
        type: SHOW_CUSTOMER_DETAIL,
        id: customerId
    });
};
   