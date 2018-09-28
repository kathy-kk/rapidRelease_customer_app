import React from 'react';
import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap'; 

const FormItem = ({title}) => (
    <FormGroup>
        <ControlLabel>{title}</ControlLabel>
        <FormControl type="text" placeholder={title}></FormControl>
    </FormGroup> 
);
export default FormItem;