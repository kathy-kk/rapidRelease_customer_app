import React from 'react';
import { connect } from 'react-redux';
//import FormItem from '../../../components/formItem';
import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap'; 
import {  getEditMode,getValidationError } from '../../../store/Customer/reducer';

class CustomerForm  extends React.Component {

    constructor(props){
        super(props);
        this.getFormItem = this.getFormItem.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        const editCustomer = this.props.editCustomer;

        this.state = editCustomer?
            {
                name: editCustomer.name,
                phone: editCustomer.phone,
                date_of_birth: editCustomer.date_of_birth,
                email:editCustomer.email
            }
            :{name:'no name'};
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.editCustomer == null){
            this.setState({name: '', phone: '', email: '', date_of_birth: ''});
        }
    }
    handleOnChange(e) {
        e.preventDefault();
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState( {[fieldName]: fieldValue},() => this.props.handleOnChange(this.state) );
         
    }
    getFormItem( title, key ) {
        const { editCustomer } = this.props; 
        const placeholder = editCustomer==null?title:editCustomer[key];
        return <FormGroup >
            <ControlLabel>{title}</ControlLabel>
            <FormControl value={this.state[key]}  name = {key} onChange = {this.handleOnChange} type="text" placeholder={placeholder} ></FormControl>
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
    const editMode = getEditMode(state);
    return {
        isAdding: editMode.add,
        validationError: getValidationError(state)
    };
};
export default connect(mapStateToProps, null)(CustomerForm);