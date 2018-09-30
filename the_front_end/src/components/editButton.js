import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
const EditButton = ({onClick}) => (
    <Button onClick = {onClick}><FaEdit /></Button>
);
export default EditButton;
