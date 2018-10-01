import React from 'react';
import CustomerList from './containers/CustomerList';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import CustomerControl from './containers/CustomerControl';
import CustomerView from './containers/CustomerView';
import CustomerForm from './containers/CustomerForm';
import { connect } from 'react-redux';
import { getCustomerById, getIdList, getEdit, getSelectedCustomer, getEditMode } from '../../store/Customer/reducer';
import '../../root.css';
import * as actions from '../../store/Customer/actions/';
import { validateCustomerField, parseJoiError } from '../../utils/helper';


class MainScreen extends React.Component{
    constructor(props){
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            form: {}
        };
        this.modifyCustomer = this.modifyCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }
    componentDidMount(){
        const { fetchCustomers } = this.props;
        fetchCustomers();
    }
    getBodyContent(edit, selectedCustomer){
        if(selectedCustomer!==null) {
            const name = selectedCustomer.name;
            const date_of_birth = selectedCustomer.date_of_birth;
            const email = selectedCustomer.email;
            const phone = selectedCustomer.phone;
            if(!edit) return <CustomerView name={name}  date_of_birth = {date_of_birth} email = {email} phone={phone}/>;
            else return <CustomerForm  editCustomer={selectedCustomer}  handleOnChange = {this.handleOnChange}/>;
        }else{
            if(edit) return <CustomerForm editCustomer={selectedCustomer}  handleOnChange = {this.handleOnChange}/>;
            else return  <div></div>;
        }   
    }
 

    handleSave(){
        const {  selectedCustomer} = this.props;
        if(selectedCustomer){
            this.modifyCustomer(selectedCustomer);
        }else{
            this.addCustomer();    
        }
    }
    addCustomer(){
        const error = validateCustomerField(this.state.form).error;
        if(error){
            const errorMessage = parseJoiError(error.message);
            this.props.failToAddCustomer(errorMessage);
        }else{
            try{
                const name = this.state.form.name;
                const email = this.state.form.email;
                const phone = this.state.form.phone;
                const date_of_birth = this.state.form.date_of_birth;
                this.props.addCustomer(name, date_of_birth,email,phone);
            }catch(err){
                console.log(err);
            }
        }
    }

    modifyCustomer(selectedCustomer){

        const updatedCustomer = {...selectedCustomer, ...this.state.form};
        const fields = { name: updatedCustomer.name, email: updatedCustomer.email, phone: updatedCustomer.phone, date_of_birth: updatedCustomer.date_of_birth };
        const error = validateCustomerField(fields).error;
      
        if(error){
            const errorMessage = parseJoiError(error.message);
            this.props.failToModifyCustomer(errorMessage);
        }else{
            try{
                this.props.modifyCustomer( selectedCustomer.customer_id,fields.name, fields.date_of_birth, fields.email, fields.phone);
            }catch(err){
                console.log(err);
            } 
        }
    }
 
    handleOnChange(form){
        this.setState({form});
    }
    render(){
        const { customersArray, edit, selectedCustomer } = this.props; 
        return( <Grid>
            <Row>
                <Col xs={6} md={4}>
                    <Panel>
                        <Panel.Heading>My Customers</Panel.Heading>  
                        <CustomerList  customersArray = {customersArray} /> 
                    </Panel>
                </Col>
                <Col xs={6} md={8}>
                    <Panel>
                        <Panel.Heading><CustomerControl handleSave = {this.handleSave}/></Panel.Heading>
                        <Panel.Body>
                            {
                                this.getBodyContent(edit, selectedCustomer)
                            }
                        </Panel.Body>
                    </Panel>
                </Col>   
            </Row>
        </Grid>);
    }
}
const mapStateToProps = (state) => {
    const idList = getIdList(state);
    const customersArray = idList.map(customerId => getCustomerById(customerId, state));
    const selectedCustomer = getSelectedCustomer(state)?getCustomerById(getSelectedCustomer(state),state):null;
    return { 
        customersArray,
        edit: getEdit(state),
        add: getEditMode(state).add,
        modify: getEditMode(state).modify,
        selectedCustomer
    };
};

export default connect(mapStateToProps, actions)(MainScreen);
