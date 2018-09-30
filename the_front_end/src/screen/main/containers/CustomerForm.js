import React from 'react';
import { connect } from 'react-redux';
//import FormItem from '../../../components/formItem';
import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap'; 
import { getSelectedCustomer, getCustomerById, getValidationError } from '../../../store/Customer/reducer';

class CustomerForm  extends React.Component {

    getFormItem( title, key ) {
        const { handleOnChange, selectedCustomer } = this.props; 
        const placeholder = selectedCustomer==null?title:selectedCustomer[key];

        return <FormGroup key = {key}>
            <ControlLabel>{title}</ControlLabel>
            <FormControl id = {key} onChange = {handleOnChange} type="text" placeholder={placeholder}></FormControl>
        </FormGroup>; 
    }
  
    render(){
        const { validationError } = this.props;
        const nameInput = this.getFormItem('Name','name');
        const dateOfBirthInput = this.getFormItem('Date of Birth (DD-MM-YYYY)', 'date_of_birth');
        const emailInput = this.getFormItem('Email', 'email');
        const phoneInput = this.getFormItem('Phone','phone');     
        return  <div>   
            {nameInput}
            {dateOfBirthInput}
            {emailInput}
            {phoneInput}
            <div>
                <p style = {{color: 'red'}}>{validationError}</p>
            </div>
        </div>;
    }
}
const mapStateToProps = (state) => {
    const selectedCustomer = getSelectedCustomer(state)?getCustomerById(getSelectedCustomer(state),state):null;
    return {
        selectedCustomer,
        validationError: getValidationError(state)
    };
};
export default connect(mapStateToProps, null)(CustomerForm);