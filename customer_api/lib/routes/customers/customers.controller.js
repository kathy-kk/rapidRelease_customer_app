const express = require('express')
const customerController = express.Router()
const Customer = require('./customer')()
const ValidationError = require('../../error/validationError');

customerController
  .post('/create', async (req, res, next) => {
    const payloadData = req.body;
    const name = payloadData.name;
    const email = payloadData.email;
    const date_of_birth = payloadData.date_of_birth;
    const phone = payloadData.phone;
    try{
        const customer =  await Customer.create(name, date_of_birth, email, phone);
        res.status(200).send({customer})
    }catch(err){
        if(err instanceof ValidationError)
            res.status(400).send({error:err.message});
        else 
            res.status(500).send({error: err.message||'Something is wrong on the server'})
    }
  })
  
  customerController
  .put('/id', async (req, res, next) => {
    try{
        const id = req.query.id;
        const customer = req.body.customer;
        if(customer){
            const modifiedCustomer =  await Customer.findAndUpdateCustomer(id, customer);
        res.status(200).send({customer: modifiedCustomer})
        }else{
            throw new ValidationError('customer is empty');
        }
    }catch(err){
        if(err instanceof ValidationError)
        res.status(400).send({error:err.message});
    else res.status(500).send({error: err.message||'Something is wrong on the server'})
    }
  })

  customerController
  .get('/', async (req, res, next) => {
    try{
        const customers = await Customer.getAll();
        res.status(200).send(customers);
    }catch(err){
        if(err instanceof ValidationError)
            res.status(400).send({error:err.message});
        else res.status(500).send({error: err.message||'Something is wrong on the server'})
    }
  })

  customerController
  .delete('/', async (req, res, next) => {
      try{
        const emailId = req.body.email
        const customer = await Customer.deleteCustomer(emailId);
        res.status(200).send({customer});
      }catch(err){
        if(err instanceof ValidationError)
            res.status(400).send({error:err.message});
        else res.status(500).send({error: err.message||'Something is wrong on the server'})
      }
  })

module.exports = customerController