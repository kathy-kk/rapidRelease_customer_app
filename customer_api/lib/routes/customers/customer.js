const mongoose = require('mongoose');
const helpers = require('../../utils/helpers');
const moment = require('moment');
const ValidationError = require('../../error/validationError');
const validateCustomerField = helpers.validateCustomerField;
const validateEmail = helpers.validateEmail;

const Customer = () => {

    const CustomerSchema = new mongoose.Schema({
        name: String,
        date_of_birth: Date,
        email: String,
        phone: String
      });

    const CustomerModel = mongoose.model('Customer', CustomerSchema);
    
    async function duplicateValidate (email) {
            const count= await CustomerModel.count({email});
            if(count !== 0) throw new ValidationError('duplicate email')   
    }

    async function getValidatedCustomer(name, date_of_birth, email, phone) {
        const formatedDate = new Date(date_of_birth);
        if(moment(date_of_birth).isValid() === false) 
            throw new ValidationError('invalid date of birth');
        const error = validateCustomerField({name, email, date_of_birth: formatedDate, phone}).error;
        if(error) 
            throw new ValidationError(error.message);
        await duplicateValidate(email);  
        return {name, email, date_of_birth, phone}
    }

    async function create (name, date_of_birth, email, phone) {
        const validatedCustomer = await getValidatedCustomer(name, date_of_birth, email, phone)
        await CustomerModel.create(validatedCustomer);  
        return await CustomerModel.find({email})
    }

    async function deleteCustomer (email) {
        if(validateEmail(email)===false) 
            throw new ValidationError('invalid emailid')
        const customer = await CustomerModel.find({email})
        if(customer.length === 0) throw new ValidationError('Customer not exist')
              const response = await CustomerModel.deleteOne({email});
        if(response.ok)
            return customer
        else throw new Error('Fail to delete')
    }

    async function findAndUpdateCustomer(id, customer){
        const email = customer.email;
        const date_of_birth = customer.date_of_birth;
        const name = customer.name;
        const phone = customer.phone;
        const validatedCustomer = await getValidatedCustomer(name, date_of_birth, email, phone);
        const modifiedCustomer =  CustomerModel.findByIdAndUpdate(id,validatedCustomer,{new: true});
        return modifiedCustomer;
    }

    async function getAll () {
        const customers = await CustomerModel.find();
        return customers
    }

    return {
        findAndUpdateCustomer,
        deleteCustomer,
        create,
        getAll,
    }
}


module.exports = Customer
