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
            else return <CustomerForm handleOnChange = {this.handleOnChange}/>;
        }else{
            if(edit) return <CustomerForm handleOnChange = {this.handleOnChange}/>;
            else return  <div></div>;
        }   
    }
    handleSave(){
        const error = validateCustomerField(this.state.form).error;
        const { addCustomer, failToAddCustomer, add } = this.props;
        if(error){
            const errorMessage = parseJoiError(error.message);
            if(add) failToAddCustomer(errorMessage);
        }else{
            try{
                const name = this.state.form.name;
                const email = this.state.form.email;
                const phone = this.state.form.phone;
                const date_of_birth = this.state.form.date_of_birth;
                if(add){
                    addCustomer(name, date_of_birth,email,phone);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    handleOnChange(e){
        const fieldName = e.target.id;
        const fieldValue = e.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fieldValue} });
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
