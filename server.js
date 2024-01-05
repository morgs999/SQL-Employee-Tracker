const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'morgan',
        database: 'employees_db',
    },
    console.log("Connected to employees_db")
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

const mainMenu = () => {
    // console.log("At the main menu.");
    return inquirer.prompt([
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
    ]);
}

const viewEmployees = () => db.execute('SELECT * FROM employees', function (err, results) {
    console.table(results);
});

const viewDeparments = () => db.execute('SELECT * FROM deparments', function (err, results) {
    console.table(results);
});

const viewRoles = () => db.execute('Select * From roles', function (err, results) {
    console.table(results);
});

const runDb = async () => {
    await mainMenu();


}

