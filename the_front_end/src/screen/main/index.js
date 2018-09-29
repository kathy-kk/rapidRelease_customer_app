import React from 'react';
import CustomerList from './containers/CustomerList';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import CustomerControl from './containers/CustomerControl';
import CustomerView from './containers/CustomerView';
import CustomerForm from './containers/CustomerForm';
import { connect } from 'react-redux';
import { getCustomerById, getIdList } from '../../store/Customer/reducer';
import '../../root.css';
import * as actions from '../../store/Customer/actions/';

// const customersArray = [
//     { 
//         customerId: 1,
//         name: 'kathy',
//     },
//     {
//         customerId: 2,
//         name: 'kk'
//     }
// ];

class MainScreen extends React.Component{
    componentDidMount(){
        const { fetchCustomers } = this.props;
        fetchCustomers();
    }
    render(){
        const { customersArray } = this.props; 
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
                        <Panel.Body><CustomerForm /></Panel.Body>
                    </Panel>
                </Col>   
            </Row>
        </Grid>);
    }
}
const mapStateToProps = (state) => {
    const idList = getIdList(state);
    const customersArray = idList.map(customerId => getCustomerById(customerId, state));
    return { customersArray };
}

export default connect(mapStateToProps, actions)(MainScreen);
