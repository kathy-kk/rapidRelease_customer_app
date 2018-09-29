import React from 'react';
const CustomerView = ({ name, date_of_birth, phone ,email }) => (
    <div>
        <h3>Name:</h3>
        <p>{name}</p>
        <h3>Date of Birth:</h3>
        <p>{date_of_birth}</p>
        <h3>Phone:</h3>
        <p>{phone}</p>
        <h3>Email:</h3>
        <p>{email}</p>
    </div>
);
export default CustomerView;