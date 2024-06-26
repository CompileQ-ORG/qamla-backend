const express = require('express');
const { createCandidate, updateCandidate, getAllCandidate, getSingleCandidate, deleteCandidate, login } = require('./candidate.controller');

//router object
const router = express.Router();


//get all candidate //get
router.get('/', getAllCandidate)

//get single user by id || get
router.get('/:id', getSingleCandidate)

//create candidate || post
router.post('/createcandidate', createCandidate);

//update candidate || put
router.put('/:id', updateCandidate);

//delete candidate || patch
router.patch('/:id', deleteCandidate);

//registration of a candidate //post
router.post('/registration', createCandidate)

//login of a candidate //post
router.post('/login', login)


module.exports = router;