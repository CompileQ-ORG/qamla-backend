const express = require('express');
const { getAllCourse,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse } = require('./courseOrCertificate.controller');

//router object
const router = express.Router();

//all routes here

//get all languages //get
router.get('/', getAllCourse)

//get single language by id || get
router.get('/:id', getSingleCourse)

//create category || post
router.post('/createcourse', createCourse);

//update language || put
router.put('/:id', updateCourse);

//delete language || patch
router.patch('/:id', deleteCourse);

module.exports = router;