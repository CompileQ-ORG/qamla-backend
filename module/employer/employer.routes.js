const express = require('express');
const { getAllEmployers, getSingleEmployer, createEmployer, updateEmployer, deleteEmployer, login } = require('./employer.controller');

//router object
const router = express.Router();

//all routes here

//get all job categories //get
router.get('/', getAllEmployers)

//get single job category by id || get
router.get('/:id', getSingleEmployer)

//create category || post
router.post('/create', createEmployer);

//update category || put
router.patch('updateE/:id', updateEmployer);

//delete category || patch
router.patch('/delete/:id', deleteEmployer);

//registration of a employer
router.post('/register', createEmployer)

//login of a employer
router.post('/login', login)

module.exports = router;