import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../../components/listItem';
import { ListGroup } from 'react-bootstrap';


class CustomerList extends React.Component{
    render() {
        const { customersArray } = this.props;
        return <ListGroup  componentClass = 'ul'>
            {  customersArray.map(customer => 
                <ListItem key = {customer.customer_id} name = {customer.name} customerId = {customer.customerId}/>
            )}
        </ListGroup>;
    }
}

CustomerList.propTypes = {
    customersArray: PropTypes.array.isRequired
};
export default CustomerList;