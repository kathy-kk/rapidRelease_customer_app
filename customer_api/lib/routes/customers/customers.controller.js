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
        res.status(200).send({customer:customer})
    }catch(err){
        if(err instanceof ValidationError)
            res.status(400).send({error:err.message});
        else 
            res.status(500).send({error:'Something is wrong on the server'})
    }
  })

customerController
  .get('/', async (req, res, next) => {
    try{
        const customer = await Customer.find()
        res.status(200).send(customer)
    }catch(err){
        console.info(err);
    }
  })

customerController
  .get('/:id', async (req, res, next) => {
    const customer = await Customer.findById(req.params.id)
    res.status(200).send(customer)
  })

customerController
  .delete('/:id', async (req, res, next) => {
    const customer = await Customer.deleteOne({ _id: req.params.id })
    res.status(200).send(customer)
  })

module.exports = customerController