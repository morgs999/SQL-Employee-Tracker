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
    inquirer.prompt(questions = [
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
        .then(answer => {
            // console.log(answer);
            if (answer.mainMenu === 'View All Departments') {
                return viewDepartments();
            } else if (answer.mainMenu === 'View All Roles') {
                return viewRoles();
            } else if (answer.mainMenu === 'View All Employees') {
                return viewEmployees();
            } else if (answer.mainMenu === 'Add Department') {
                return addDepartment();
            } else if (answer.mainMenu === 'Add Role') {
                return addRole();
            } else if (answer.mainMenu === 'Add Employee') {
                return addEmployee();
            } else if (answer.mainMenu === 'Update Employee Role') {
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
            db.query('INSERT INTO departments(name) VALUES (?)', res.addDept, function (err, results) {
                if (err) {
                    console.error(err);
                    return
                }
                console.log(`${res.addDept.toUpperCase()} department added.`);
            }
            )
        });
    await setTimeout(function () { mainMenu() }, 2000);
};

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to employee_db.')
    setTimeout(function () { printLogo() }, 1000);
    setTimeout(function () { mainMenu() }, 3000);
});