import React from 'react';
import CustomerList from './containers/CustomerList';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import CustomerControl from './containers/CustomerControl';
import CustomerView from './containers/CustomerView';
import CustomerForm from './containers/CustomerForm';
import { connect } from 'react-redux';
import { getCustomerById, getIdList, getEdit, getSelectedCustomer } from '../../store/Customer/reducer';
import moment from 'moment';
import '../../root.css';
import * as actions from '../../store/Customer/actions/';


class MainScreen extends React.Component{
    componentDidMount(){
        const { fetchCustomers } = this.props;
        fetchCustomers();
    }
    getBodyContent(edit, selectedCustomer){
        if(selectedCustomer === null) return <div></div>;
        else{
            const name = selectedCustomer.name;
            const date_of_birth = moment.utc(selectedCustomer.date_of_birth, 'YYYY-MM-DD HH:mm Z').format('DD-MM-YYYY');
            const email = selectedCustomer.email;
            const phone = selectedCustomer.phone;
            if(!edit) return <CustomerView name={name}  date_of_birth = {date_of_birth} email = {email} phone={phone}/>;
            else return <CustomerForm />;
        }       
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
                        <Panel.Heading><CustomerControl /></Panel.Heading>
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
        selectedCustomer
    };
};

export default connect(mapStateToProps, actions)(MainScreen);
