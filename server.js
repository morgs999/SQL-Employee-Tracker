const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'morgan',
    database: 'employees_db',
});
