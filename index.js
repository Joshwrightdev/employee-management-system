const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "IT2me@2432",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});

const start = () => {
  inquirer.prompt({
    name: "mainMenu",
    type: "list",
    message: "WHAT WOULD YOU LIKE TO DO?",
    choices: [
      "VIEW ALL EMPLOYEES",
      "VIEW EMPLOYEES BY DEPARTMENT",
      "VIEW EMPLOYEES BY ROLE",
      "ADD EMPLOYEE",
      "REMOVE EMPLOYEE",
      "ADD ROLE",
      "DELETE ROLE",
      "ADD DEPARTMENT",
      "DELETE DEPARTMENT",
      "UPDATE EMPLOYEE ROLE",
      "UPDATE EMPLOYEE DEPARTMENT",
      "UPDATE EMPLOYEE MANAGER"
    ],
  });
};
