import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../../components/listItem';
import { ListGroup } from 'react-bootstrap';


class CustomerList extends React.Component{
    render() {
        const { customersArray } = this.props;
        return <ListGroup  componentClass = 'ul'>
            {  customersArray.map(customer => 
                <li key = {customer.customerId} className = 'list-group-item'> <ListItem  name = {customer.name} customerId = {customer.customerId}/></li>)}
        </ListGroup>;
    }
}

// CustomerList.PropTypes = {
//     customerArray: PropTypes.array.isRequired
// };
export default CustomerList;