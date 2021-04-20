const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "IT2me@2432",
  database: "employee_db",
});

const startMenu = () => {
  inquirer
    .prompt({
      name: "welcomeList",
      type: "list",
      message: "WHAT WOULD YOU LIKE TO DO?",
      choices: [
        "VIEW ALL EMPLOYEES",
        "VIEW EMPLOYEES BY DEPARTMENT",
        "VIEW EMPLOYEES BY ROLE",
        "VIEW EMPLOYEES BY MANAGER",
        "ADD EMPLOYEE",
        "REMOVE EMPLOYEE",
        "ADD ROLE",
        "DELETE ROLE",
        "ADD DEPARTMENT",
        "DELETE DEPARTMENT",
        "UPDATE EMPLOYEE ROLE",
        "UPDATE EMPLOYEE DEPARTMENT",
        "UPDATE EMPLOYEE MANAGER",
      ],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      switch (answer.welcomeList) {
        case "VIEW ALL EMPLOYEES":
          viewAllEm();
          break;
        case "VIEW EMPLOYEES BY DEPARTMENT":
          sortEmDept();
          break;
        case "VIEW EMPLOYEES BY ROLE":
          sortEmByRole();
          break;
        case "VIEW EMPLOYEES BY MANAGER":
          sortEmByMgr();
          break;
        case "ADD EMPLOYEE":
          addEm();
          break;
        case "REMOVE EMPLOYEE":
          rmvEm();
          break;
        case "ADD ROLE":
          addRule();
          break;
        case "DELETE ROLE":
          dltRole();
          break;
        case "ADD DEPARTMENT":
          addDept();
          break;
        case "DELETE DEPARTMENT":
          dltDept();
          break;
        case "UPDATE EMPLOYEE ROLE":
          updateEmRole();
          break;
        case "UPDATE EMPLOYEE DEPARTMENT":
          updateEmDept();
          break;
        case "UPDATE EMPLOYEE MANAGER":
          updateEmManager();
          break;
      }
    });
};
const viewAllEm = () => {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    startMenu();
  });
};

const addEm = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "EMPLOYEE FIRST NAME",
      },
      {
        name: "lastname",
        type: "input",
        message: "EMPLOYEE LAST NAME",
      },
      {
        name: "roleId",
        type: "input",
        message: "EMPLOYEE'S ROLE",
      },
      {
        name: "managerId",
        type: "input",
        message: "EMPLOYEE'S MANAGER (IF NO MANAGER EXIST, DISREGARD) ",
      },
    ])

    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        query,
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;
          startMenu();
        }
      );
      // console.log(query.sql);
    });
};
connection.connect((err) => {
  if (err) throw err;
  startMenu();
});
