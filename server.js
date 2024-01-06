const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'morgan',
        database: 'employees_db',
    }
);

const printLogo = () => console.log(
    logo({
        name: 'Planet Express',
        font: 'ANSI Shadow',
        lineChars: 7,
        logoColor: 'green',
        borderColor: 'red',
        textColor: 'cyan'
    })
        .right('Employee Database')
        .right('Good news everyone!')
        .render()
);

function mainMenu() {
    // console.log("At the main menu.");
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit',
            ],
        },
    ])
        .then(res => {
            // console.log(answer);
            if (res.mainMenu === 'View All Departments') {
                return viewDepartments();
            } else if (res.mainMenu === 'View All Roles') {
                return viewRoles();
            } else if (res.mainMenu === 'View All Employees') {
                return viewEmployees();
            } else if (res.mainMenu === 'Add Department') {
                return addDepartment();
            } else if (res.mainMenu === 'Add Role') {
                return addRole();
            } else if (res.mainMenu === 'Add Employee') {
                return addEmployee();
            } else if (res.mainMenu === 'Update Employee Role') {
                return updateEmployeeRole();
            } else {
                process.exit();
            };
        })
};

const viewDepartments = () => {
    db.execute('SELECT * FROM departments', function (err, results) {
        console.table(results);
    });
    setTimeout(function () { mainMenu() }, 2000);
};

const viewRoles = () => {
    db.execute('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id=departments.id', function (err, results) {
        console.table(results);
    });
    setTimeout(function () { mainMenu() }, 2000);
};

const viewEmployees = () => {
    db.execute('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, employees.manager_id FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id', function (err, results) {
        console.table(results);
    });
    setTimeout(function () { mainMenu() }, 2000);
};

const addDepartment = async () => {
    await inquirer.prompt([{
        type: 'input',
        message: 'What department would  you like to add?',
        name: 'addDept'
    }])
        .then((res) => {
            db.query('INSERT INTO departments(name) VALUES (?)', res.addDept);
            console.log(`${res.addDept.toUpperCase()} department added.`);
        });
    await setTimeout(function () { mainMenu() }, 2000);
};

const addRole = async () => {
    const [deptChoices] = await db.promise().query('SELECT * FROM departments');

    await inquirer.prompt([
        {
            type: 'input',
            message: "What's the name of the role?",
            name: 'addRole'
        },
        {
            type: 'input',
            message: "What's the salary for the role?",
            name: 'addSalary'
        },
        {
            type: 'list',
            message: 'What department is this role in?',
            name: 'roleDept',
            choices: deptChoices.map((department) => ({
                name: department.name,
                value: department.id,
            })
            )
        }
    ]).then((res) => {
        const newRole = [res.addRole, res.addSalary, res.roleDept];
        db.query('INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)', newRole);
        console.log(`${res.addRole.toUpperCase()} role added.`);
    })
    await setTimeout(function () { mainMenu() }, 2000);
}

const addEmployee = async () => {
    const [roleChoices] = await db.promise().query('SELECT * FROM roles');

    const [employeeChoices] = await db.promise().query('SELECT * FROM employees');

    await inquirer.prompt([
        {
            type: 'input',
            message: 'Employee First Name:  ',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employee Last Name:  ',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'Employee Role:  ',
            name: 'empRole',
            choices: roleChoices.map((role) => ({
                name: role.title,
                value: role.id,
            }))
        },
        {
            type: 'list',
            message: 'Employee Manager:  ',
            name: 'empMan',
            choices: employeeChoices.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }))
        }
    ]).then((res) => {
        const newEmployee = [res.firstName, res.lastName, res.empRole, res.empMan];
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', newEmployee);
        console.log(`${res.firstName.toUpperCase()} ${res.lastName.toUpperCase()} the employee added.`);
    })
    await setTimeout(function () { mainMenu() }, 2000);
}

const updateEmployeeRole = async () => {
    const [employeeChoices] = await db.promise().query('SELECT * FROM employees');
    const [roleChoices] = await db.promise().query('SELECT * FROM roles');

    await inquirer.prompt([
        {
            type: 'list',
            message: 'Choose an Employee:  ',
            name: 'employee',
            choices: employeeChoices.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.first_name,
            }))
        },
        {
            type: 'list',
            message: "Employee's New Role:  ",
            name: 'empRole',
            choices: roleChoices.map((role) => ({
                name: role.title,
                value: role.id,
            }))
        }
    ]).then((res) => {
        const newRole = [res.empRole, res.employee];
        db.query('UPDATE employees SET role_id=? where first_name=?', newRole);
        console.log(`${res.employee.toUpperCase()}'s role changed.`);
    })
    await setTimeout(function () { mainMenu() }, 2000);
};

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to employee_db.')
    setTimeout(function () { printLogo() }, 1000);
    setTimeout(function () { mainMenu() }, 3000);
});