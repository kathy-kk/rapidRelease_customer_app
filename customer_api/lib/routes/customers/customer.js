const mongoose = require('mongoose');
const helpers = require('../../utils/helpers');
const moment = require('moment');
const ValidationError = require('../../error/validationError');
const validateCustomerField = helpers.validateCustomerField;


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

    async function create (name, date_of_birth, email, phone) {
        const formatedDate = new Date(date_of_birth);
        if(moment(date_of_birth).isValid() === false) 
            throw new ValidationError('invalid date of birth');
        const error = validateCustomerField({name, email, date_of_birth: formatedDate, phone}).error;
        if(error) 
            throw new ValidationError(error.message);
        await duplicateValidate(email);        
        await CustomerModel.create({name, email, date_of_birth, phone});  
        return await CustomerModel.find({email})
    }

    async function getAll () {
        const customers = await CustomerModel.find();
        return customers
    }
    return {
        create,
        getAll
    }
}


module.exports = Customer
