const express = require('express');
// const { createJobCategory, updateJobCategory, deleteJobCategory, getSingleJobCategory, getAllJobCategories } =
//     require('./jobCategory.controller');
const { createSkill, getSingleSkill, getAllSkill, updateSkill, deleteSkill } = require('./skill.controller');

//router object
const router = express.Router();

//all routes here

//get all skills //get
router.get('/', getAllSkill)

//get single skill by id || get
router.get('/:id', getSingleSkill)

//create category || post
router.post('/createskill', createSkill);

//update skill || put
router.put('/:id', updateSkill);

//delete category || patch
router.patch('/:id', deleteSkill);

module.exports = router;