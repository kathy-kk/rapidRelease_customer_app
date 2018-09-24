const Joi = require('joi');
const validator = require('validator');

const getValidateSchema = () => {
    return {
        name: Joi.string().regex(/^[a-zA-Z ]+$/).trim().min(2).required(),
        email: Joi.string().email().required(),
        date_of_birth: Joi.date().max('1-1-2018').iso(),
        phone: Joi.string().regex(/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/).required()
    };
};

function validateEmail (email) {
    return validator.isEmail(email);
}

const validateCustomerField = (field) => {
    const result = Joi.validate(field, getValidateSchema());
    return result;
};

module.exports = {
    validateCustomerField,
    validateEmail
};
