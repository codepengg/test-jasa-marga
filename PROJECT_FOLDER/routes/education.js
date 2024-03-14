const express = require('express');
const router = express.Router();
const { findAllEmployeeEducation, findEmployeeEducation, insertEmployeeEducation, updateEmployeeEducation, deleteEmployeeEducation } = require('../controllers/education');

router.get('/', findAllEmployeeEducation);
router.get('/:id', findEmployeeEducation);
router.post("/", insertEmployeeEducation);
router.put('/:id', updateEmployeeEducation);
router.delete('/:id', deleteEmployeeEducation);

module.exports = router;
