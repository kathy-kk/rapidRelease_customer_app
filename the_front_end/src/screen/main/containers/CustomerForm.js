import React from 'react';
import FormItem from '../../../components/formItem';

const CustomerForm = () => (
    <div>   
        <FormItem title={'Name'} />
        <FormItem title={'date-of-birth'} />
        <FormItem title={'Email'} />
        <FormItem title={'phone'} />      
    </div>
);
export default CustomerForm;