import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../../components/listItem';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/Customer/actions';
import { getSelectedCustomer, getIsLoading } from '../../../store/Customer/reducer';


class CustomerList extends React.Component{
    render() {
        const { selectedCustomer, customersArray, showCustomerDetail, removeCustomer, isLoading } = this.props;
        if(isLoading) return <p>Is Loading...</p>
        return <ListGroup  componentClass = 'ul'>
            {  customersArray.map(customer => 
                <ListItem key = {customer.customer_id} 
                    name = {customer.name} 
                    deleteCustomer =  {removeCustomer}
                    customerId = {customer.customer_id}
                    itemOnclick = {showCustomerDetail} 
                    highLight = { selectedCustomer?selectedCustomer == customer.customer_id : false}      
                />
            )}
        </ListGroup>;
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: getIsLoading(state),
        selectedCustomer: getSelectedCustomer (state)
    };
};

CustomerList.propTypes = {
    customersArray: PropTypes.array.isRequired
};
export default connect(mapStateToProps ,actions)(CustomerList);