const express = require('express');
const { createUser, getAllUser, getSingleUser, updateUser, deleteUser } = require('./user.controller');

//router object
const router = express.Router();

//all routes here

//get all users //get
router.get('/', getAllUser)

//get single user by id || get
router.get('/:id', getSingleUser)

//create user || post
router.post('/createuser', createUser);

//update user || put
router.put('/:id', updateUser);

//delete user || patch
router.patch('/:id', deleteUser);

module.exports = router;