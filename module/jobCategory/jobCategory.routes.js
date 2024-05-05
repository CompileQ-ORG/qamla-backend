const express = require('express');
const { createJobCategory, updateJobCategory, deleteJobCategory, getSingleJobCategory, getAllJobCategories } =
    require('./jobCategory.controller');

//router object
const router = express.Router();

//all routes here

//get all job categories //get
router.get('/', getAllJobCategories)

//get single job category by id || get
router.get('/singlejobcategory/:id', getSingleJobCategory)

//create category || post
router.post('/createcategory', createJobCategory);

//update category || put
router.put('/update/:id', updateJobCategory);

//delete category || patch
router.patch('/delete/:id', deleteJobCategory);

module.exports = router;