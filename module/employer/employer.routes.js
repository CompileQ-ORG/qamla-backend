const express = require('express');
const { getAllEmployers, getSingleEmployer, createEmployer, updateEmployer, deleteEmployer, login } = require('./employer.controller');

//router object
const router = express.Router();


//get all employers //get
router.get('/', getAllEmployers)

//get single employers by id || get
router.get('/:id', getSingleEmployer)

//create employers || post
router.post('/create', createEmployer);

//update employers || put
router.patch('updateE/:id', updateEmployer);

//delete employers || patch
router.patch('/delete/:id', deleteEmployer);

//registration of a employer
router.post('/register', createEmployer)

//login of a employer
router.post('/login', login)

module.exports = router;