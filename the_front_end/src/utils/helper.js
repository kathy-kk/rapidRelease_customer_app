import Joi from 'joi';
import validator from 'validator';
import moment from 'moment';

const getValidateSchema = () => {
    return {
        name: Joi.string().regex(/^[a-zA-Z ]+$/).trim().min(2).required(),
        email: Joi.string().email().required(),
        date_of_birth: Joi.date().max('1-1-2018').iso(),
        phone: Joi.string().regex(/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/).required()
    };
};

export const formatDatetoString = (utc) => {
    return  moment.utc(utc, 'YYYY-MM-DD HH:mm Z').format('DD-MM-YYYY');
};

export const formatDateToUtc = (dateString) => {
    return new Date(dateString);
};

export const validateEmail = (email) => {
    return validator.isEmail(email);
};

export const parseJoiError = (error) => {
    const messageArray = error.replace(/["]/ig, '').split('because');
    const field = messageArray[0].split(' ')[1].trim();
    switch (field){
    case 'email':
        return 'Invalid email.';
    case 'phone':
        return 'Invalid phone number.';
    case 'name':
        return 'Invalid name.';
    case 'date_of_birth':
        return 'Invalid date of birth';
    default:
        return 'Error.';
    }
};

export const validateCustomerField = (field) => {
    const fieldCopy = { ...field };
    if(fieldCopy.date_of_birth){
        fieldCopy.date_of_birth = formatDateToUtc(field.date_of_birth);
    }
    const result = Joi.validate(fieldCopy, getValidateSchema());
    return result;
};