import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../../components/listItem';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/Customer/actions';


class CustomerList extends React.Component{
    render() {
        const { customersArray, showCustomerDetail } = this.props;
        return <ListGroup  componentClass = 'ul'>
            {  customersArray.map(customer => 
                <ListItem key = {customer.customer_id} 
                    name = {customer.name} 
                    customerId = {customer.customer_id}
                    itemOnclick = {showCustomerDetail}        
                />
            )}
        </ListGroup>;
    }
}

CustomerList.propTypes = {
    customersArray: PropTypes.array.isRequired
};
export default connect(null ,actions)(CustomerList);