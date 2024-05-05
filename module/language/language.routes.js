const express = require('express');
// const { createJobCategory, updateJobCategory, deleteJobCategory, getSingleJobCategory, getAllJobCategories } =
//     require('./jobCategory.controller');
// const { createSkill, getSingleSkill, getAllSkill, updateSkill, deleteSkill } = require('./skill.controller');
const { createLanguage, getAllLanguage, getSingleLanguage, updateLanguage, deleteLanguage } = require('./language.controller');

//router object
const router = express.Router();

//all routes here

//get all languages //get
router.get('/', getAllLanguage)

//get single language by id || get
router.get('/:id', getSingleLanguage)

//create category || post
router.post('/createlanguage', createLanguage);

//update language || put
router.put('/:id', updateLanguage);

//delete language || patch
router.patch('/:id', deleteLanguage);

module.exports = router;