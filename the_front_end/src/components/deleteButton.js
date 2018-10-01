import React from 'react';
import { FaTimes } from 'react-icons/fa';

const DeleteButton = ({ deleteCustomer }) => (
    <button name = 'deleteButton' onClick = {deleteCustomer}  style={{'padding': 0, 'border':0 }}><FaTimes name='deleteButtonIcon' /></button>
);
export default DeleteButton;
