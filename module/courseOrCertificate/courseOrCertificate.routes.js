const express = require('express');
const { getAllCourse,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse } = require('./courseOrCertificate.controller');

//router object
const router = express.Router();


//get all training and certifications //get
router.get('/', getAllCourse)

//get single training and certifications by id || get
router.get('/:id', getSingleCourse)

//create training and certifications || post
router.post('/createcourse', createCourse);

//update training and certifications || put
router.put('/:id', updateCourse);

//delete training and certifications || patch
router.patch('/:id', deleteCourse);

module.exports = router;