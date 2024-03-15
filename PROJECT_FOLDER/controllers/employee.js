const db = require('../models/index')
const Employee = db.Employee;
const { QueryTypes } = require('sequelize')

async function insertEmployeeData(req, res) {
    const existNik = await findEmployeeByNik(req.body.employee.nik);
    if (!existNik) {
        db.sequelize.transaction(async (t) => {
            const employee = Employee.create({
                nik: req.body.employee.nik,
                name: req.body.employee.name,
                startDate: req.body.employee.startDate,
                endDate: req.body.employee.endDate,
                isActive: true,
                profile: req.body.employee.profile,
                family: req.body.employee.family,
                education: req.body.employee.education,
            }, {
                transaction: t,
                include: [
                    {
                        model: db.EmployeeProfile,
                        as: 'profile',
                    },
                    {
                        model: db.EmployeeFamily,
                        as: 'family',
                    },
                    {
                        model: db.Education,
                        as: 'education',
                    },
                ]
            })

            return employee;
        }).then((employee) => res.status(201).json({ employee: employee }))
            .catch((error) => res.status(400).json({ status: 'error', message: error }));
    } else {
        res.status(400).json({ status: 'error', message: "nik exists", employee: existNik });
    }
}

async function insertEmployee(req, res) {
    const existNik = await findEmployeeByNik(req.body.employee.nik);
    if (existNik) {
        return res.status(400).json({ status: 'error', message: "nik exists", employee: existNik });
    }

    db.sequelize.transaction(async (t) => {
        const employee = Employee.create(req.body.employee, {
            transaction: t,
            include: [
                {
                    model: db.EmployeeProfile,
                    as: 'profile',
                },
                {
                    model: db.EmployeeFamily,
                    as: 'family',
                },
                {
                    model: db.Education,
                    as: 'education',
                },
            ]
        })

        return employee;
    }).then((employee) => res.status(201).json({ employee: employee }))
        .catch((error) => res.status(400).json({ status: 'error', message: error }));
}

async function findEmployeeByNik(nik) {
    const employee = await Employee.findOne({
        where: {
            nik: nik,
        }
    })

    return employee;
}

async function findEmployee(req, res) {
    Employee.findByPk(req.params.id, {
        include: [
            {
                model: db.EmployeeProfile,
                as: 'profile',
                attributes: ['id', 'placeOfBirth', 'dateOfBirth', 'gender', 'isMarried', 'profPict'],
            },
            {
                model: db.EmployeeFamily,
                as: 'family',
                attributes: ['id', 'name', 'religion', 'isLife', 'isDivorced', 'relationStatus', 'placeOfBirth', 'dateOfBirth'],
            },
            {
                model: db.Education,
                as: 'education',
                attributes: ['id', 'name', 'level', 'description'],
            },
        ]
    }).then((employee) => {
        if (employee) {
            return res.status(200).json({ employee: employee })
        } else {
            return res.status(401).json({ status: 'error', message: "not found" });
        }
    }).catch((error) => res.status(400).json({ status: 'error', message: error }));
}


async function findAllEmployees(req, res) {
    Employee.findAll({
        include: [
            {
                model: db.EmployeeProfile,
                as: 'profile',
                attributes: ['placeOfBirth', 'dateOfBirth', 'gender', 'isMarried', 'profPict'],
            },
            {
                model: db.EmployeeFamily,
                as: 'family',
                attributes: ['name', 'religion', 'isLife', 'isDivorced', 'relationStatus', 'placeOfBirth', 'dateOfBirth'],
            },
            {
                model: db.Education,
                as: 'education',
                attributes: ['name', 'level', 'description'],
            },
        ]
    }).then((employee) => {
        if (employee) {
            return res.status(200).json({ employee: employee })
        } else {
            return res.status(401).json({ status: 'error', message: "not found" });
        }
    }).catch((error) => res.status(400).json({ status: 'error', message: error }));
}


async function updateEmployee(req, res) {
    const employeeId = req.params.id;
    db.sequelize.transaction(async (t) => {
        const employee = await Employee.findByPk(employeeId, {
            transaction: t,
            include: [
                {
                    model: db.EmployeeProfile,
                    as: 'profile',
                    attributes: ['placeOfBirth', 'dateOfBirth', 'gender', 'isMarried', "profPict"],
                },
                {
                    model: db.EmployeeFamily,
                    as: 'family',
                    attributes: ['name', 'religion', 'isLife', 'isDivorced', 'relationStatus', 'placeOfBirth', 'dateOfBirth'],
                },
                {
                    model: db.Education,
                    as: 'education',
                    attributes: ['name', 'level', 'description'],
                },
            ]
        })

        return employee;
    }).then((employee) => {
        if (employee) {
            employee.update({
                nik: req.body.employee.nik || employee.nik,
                name: req.body.employee.name || employee.name,
                startDate: req.body.employee.startDate || employee.startDate,
                endDate: req.body.employee.endDate || employee.endDate
            })
                .then((employeeNew) => res.status(200).json({ employee: employeeNew }))
                .catch((error) => res.status(400).json({ status: 'error', message: error }))
        } else {
            return res.status(401).json({ status: 'error', message: "not found" });
        }
    }).catch((error) => res.status(400).json({ status: 'error', message: error }));
}

async function deleteEmployee(req, res) {
    const employeeId = req.params.id;
    db.sequelize.transaction(async (t) => {
        const employee = await Employee.findByPk(employeeId, {
            transaction: t,
            include: [
                {
                    model: db.EmployeeProfile,
                    as: 'profile',
                    attributes: ['placeOfBirth', 'dateOfBirth', 'gender', 'isMarried'],
                },
                {
                    model: db.EmployeeFamily,
                    as: 'family',
                    attributes: ['name', 'religion', 'isLife', 'isDivorced', 'relationStatus', 'placeOfBirth', 'dateOfBirth'],
                },
                {
                    model: db.Education,
                    as: 'education',
                    attributes: ['name', 'level', 'description'],
                },
            ]
        })

        return employee;
    }).then((employee) => {
        if (employee) {
            employee.destroy()
                .then((employeeNew) => res.status(200).json({ status: 'success' }))
                .catch((error) => res.status(400).json({ status: 'error', message: error }))
        } else {
            return res.status(401).json({ status: 'error', message: "not found" });
        }
    }).catch((error) => res.status(400).json({ status: 'error', message: error }));
}

async function updateEmployeeData(req, res) {
    const employeeId = req.params.id
    const employeeData = req.body.employee;
    const employeeProfile = employeeData.profile;
    const employeeFams = employeeData.family;
    const employeeEdu = employeeData.education;

    const employee = await Employee.findOne({ where: { id: employeeId, isActive: true } })

    if (!employee) {
        return res.status(401).json({ status: 'error', message: "not found" });
    }

    db.sequelize.transaction(async (t) => {
        await employee.update(employeeData, { transaction: t });
        await db.EmployeeProfile.findOne({
            where: { employeeId: employeeId, id: employeeProfile.id },
            transaction: t
        }).then(async (profile) => await profile.update(employeeProfile));

        await Promise.all(employeeFams.map(async (data) => {
            await db.EmployeeFamily.findOne({
                where: { employeeId: employeeId, id: data.id },
                transaction: t
            }).then(async (fam) => await fam.update(data))
        }))

        await Promise.all(employeeEdu.map(async (data) => {
            await db.Education.findOne({
                where: { employeeId: employeeId, id: data.id },
                transaction: t
            }).then(async (edu) => await edu.update(data))
        }))
    }).then(async () => {
        const employee = await Employee.findOne({
            where: { id: employeeId, isActive: true }, include: [
                {
                    model: db.EmployeeProfile,
                    as: 'profile',
                    attributes: ['placeOfBirth', 'dateOfBirth', 'gender', 'isMarried', "profPict"],
                },
                {
                    model: db.EmployeeFamily,
                    as: 'family',
                    attributes: ['name', 'religion', 'isLife', 'isDivorced', 'relationStatus', 'placeOfBirth', 'dateOfBirth'],
                },
                {
                    model: db.Education,
                    as: 'education',
                    attributes: ['name', 'level', 'description'],
                },
            ]
        })

        return res.status(200).json({ employee: employee });
    }).catch((error) => {
        console.log(error);
        return res.status(400).json({ status: "error", message: error })
    })
}

async function getReportAllEmployee(req, res) {
    console.log("reports");
    try {
        const employees = await db.sequelize.query(`select
        e.id as employee_id,
        e.nik ,
        e."name" ,
        e.is_active ,
        ep.gender,
        CONCAT(DATE_PART('year',
        AGE(NOW(),
        ep.date_of_birth)),
        ' Years Old') as age,
        ed.school_name,
        ed.levels,
        coalesce (ef.keterangan,
        '-') as family_data
    from
        employee e
    left join employee_profile ep on
        ep.employee_id = e.id
    left join (
        select
            employee_id,
            STRING_AGG(relation_status_count,
            ' & ') as keterangan
        from
            (
            select
                ef.employee_id,
                CONCAT(COUNT(*),
                ' ',
                ef.relation_status) as relation_status_count
            from
                employee_family ef
            group by
                ef.employee_id,
                ef.relation_status
    ) as ef_subquery
        group by
            employee_id
    ) ef on
        ef.employee_id = e.id
    left join (
        select
            ee.employee_id ,
            STRING_AGG(ee."name",
            ', ') as school_name,
            STRING_AGG(ee."level"::text,
            ', ') as levels
        from
            public.employee_education ee
        group by
            ee.employee_id 
    ) ed on
        ed.employee_id = e.id`, { type: QueryTypes.SELECT });

        return res.status(200).json({ employees: employees })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error reports", message: error });
    }
}

module.exports = {
    insertEmployee, findAllEmployees, findEmployee, updateEmployee, deleteEmployee, insertEmployeeData, updateEmployeeData, getReportAllEmployee
}