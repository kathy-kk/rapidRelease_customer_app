import React from 'react';
import CustomerList from './containers/CustomerList';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import '../../root.css';

const customersArray = [
    { 
        customerId: 1,
        name: 'kathy',
    },
    {
        customerId: 2,
        name: 'kk'
    }
];

class MainScreen extends React.Component{
    render(){
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
                        <Panel.Heading>Heading</Panel.Heading>
                        <Panel.Body>Body</Panel.Body>
                    </Panel>
                </Col>   
            </Row>
        </Grid>);
    }
}
export default MainScreen;
