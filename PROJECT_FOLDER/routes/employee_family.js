const express = require('express');
const router = express.Router();
const {
    findAllEmployeeFamily,
    findEmployeeFamily,
    insertEmployeeFamily,
    updateEmployeeFamily,
    deleteEmployeeFamily
} = require('../controllers/employee_family');

router.get('/', findAllEmployeeFamily);
router.get('/:id', findEmployeeFamily);
router.post("/", insertEmployeeFamily);
router.put('/:id', updateEmployeeFamily);
router.delete('/:id', deleteEmployeeFamily);

module.exports = router;
