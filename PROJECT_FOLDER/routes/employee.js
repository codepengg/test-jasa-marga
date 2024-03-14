const express = require('express');
const router = express.Router();
const {
    insertEmployee,
    findAllEmployees,
    findEmployee,
    updateEmployee,
    deleteEmployee,
    insertEmployeeData,
    updateEmployeeData,
    getReportAllEmployee
} = require('../controllers/employee');

router.get('/', findAllEmployees);
router.get("/get-reports", getReportAllEmployee);
router.get('/:id', findEmployee);
router.post("/", insertEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post("/all-data", insertEmployeeData);
router.put("/all-data/:id", updateEmployeeData);


module.exports = router;
