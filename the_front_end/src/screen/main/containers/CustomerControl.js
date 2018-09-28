import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaTimes, FaEdit } from 'react-icons/fa';

const CustomerControl = () => (
    <div>
        <ButtonGroup>
            <Button><FaEdit /></Button>
            <Button><FaTimes /></Button>
        </ButtonGroup>
        <Button>Add New Customer</Button>
    </div>
);
export default CustomerControl;