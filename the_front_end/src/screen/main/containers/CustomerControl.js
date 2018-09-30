import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import * as actions from '../../../store/Customer/actions';
import { connect } from 'react-redux';
import { getEdit } from '../../../store/Customer/reducer';

import EditButton from '../../../components/editButton';
import SaveButton from '../../../components/saveButton';

class CustomerControl  extends React.Component {
    render(){
        const { edit, editNewCustomer, handleSave, editExistingCustomer } = this.props;
        return <div>
            <ButtonGroup>
                {edit?<SaveButton onClick = { handleSave }/> : <EditButton onClick= { editExistingCustomer }/>}
                <Button><FaTimes /></Button>
            </ButtonGroup>
            <Button onClick = { editNewCustomer }>Add New Customer</Button>
        </div>;
    } 
}

const mapStateToProps = (state) => ({
    edit: getEdit(state)});
export default connect(mapStateToProps, actions)(CustomerControl);