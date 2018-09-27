import React from 'react';
import { FaTimes } from 'react-icons/fa';

const DeleteButton = ({ deleteCustomer }) => (
    <button onClick = {deleteCustomer}  style={{'padding': 0, 'border':0 }}><FaTimes /></button>
);
export default DeleteButton;
