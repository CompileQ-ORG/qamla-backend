const express = require('express');
const { createJob, updateJob, deleteJob, getAllJobs, getSingleJob } = require('./job.controller');

//router object
const router = express.Router();

//all routes here

//get all jobs //get
router.get('/', getAllJobs)

//get single job by id || get
router.get('/:id', getSingleJob)

//create job || post
router.post('/create', createJob);

//update job || put
router.put('/:id', updateJob);

//delete job || patch
router.patch('/:id', deleteJob);

module.exports = router;