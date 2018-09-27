import React from 'react';
import PropTypes from 'prop-types';
import styles from './listItem.css';
import { FaUser } from 'react-icons/fa';

import DeleteButton from './deleteButton';

const ListItem = ({name, customerId, deleteCustomer}) => (
    <div className = {styles.container} key = {customerId}>
        <div className = {styles.iconContainer}><FaUser /></div>
        <div className = {styles.nameContainer}><h3>{name}</h3></div>
        <div className = {styles.buttonContainer}>
            <DeleteButton onClick = {deleteCustomer}/>
        </div>
    </div>
);

// ListItem.propTypes = {
//     name: PropTypes.String.isRequired,
//     customerId: PropTypes.String.isRequired,
//     showDetail: PropTypes.func.isRequired,
//     deleteCustomer: PropTypes.func.isRequired
// };

export default ListItem;