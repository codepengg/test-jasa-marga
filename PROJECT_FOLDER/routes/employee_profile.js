const express = require('express');
const router = express.Router();
const { findAllEmployeeProfile, findEmployeeProfile, insertEmployeeProfile, updateEmployeeProfile, deleteEmployeeProfile } = require('../controllers/employee_profile');

router.get('/', findAllEmployeeProfile);
router.get('/:id', findEmployeeProfile);
router.post("/", insertEmployeeProfile);
router.put('/:id', updateEmployeeProfile);
router.delete('/:id', deleteEmployeeProfile);

module.exports = router;
