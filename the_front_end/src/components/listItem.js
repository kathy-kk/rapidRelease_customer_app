import React from 'react';
import styles from './listItem.css';
import { FaUser } from 'react-icons/fa';

import DeleteButton from './deleteButton';

const ListItem = ({name, deleteCustomer, customerId , itemOnclick, highLight}) => {
    const handleOnClick = e => {
   
        if(e.target.name ==='deleteButton'|| e.target.parentNode.name ==='deleteButton')
            deleteCustomer(customerId);
        else{
            itemOnclick(customerId);
        }
    };

    return <li onClick = {handleOnClick}  className = {`list-group-item ${highLight? styles.highLight:''}`}>
        <div className = {styles.container} >
            <div className = {styles.iconContainer}><FaUser /></div>
            <div className = {styles.nameContainer}><h3>{name}</h3></div>
            <div className = {styles.buttonContainer}>
                <DeleteButton/>
            </div>
        </div>
    </li>;
};

export default ListItem;