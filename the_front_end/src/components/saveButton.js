import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
const CheckButton = ({onClick}) => (
    <Button onClick = {onClick}><FaCheck /></Button>
);
export default CheckButton;