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
        "VIEW ALL ROLES",
        "VIEW ALL DEPARTMENTS",
        "ADD EMPLOYEE",
        "ADD ROLE",
        "ADD DEPARTMENT",
        "UPDATE EMPLOYEE ROLE",
      ],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      switch (answer.welcomeList) {
        case "VIEW ALL EMPLOYEES":
          viewAllEm();
          break;
        case "VIEW ALL ROLES":
          viewAllRoles();
          break;
        case "VIEW ALL DEPARTMENTS":
          viewAllDepts();
          break;
        // case "VIEW EMPLOYEES BY ROLE":
        //   sortEmByRole();
        //   break;
        // case "VIEW EMPLOYEES BY MANAGER":
        //   sortEmByMgr();
        //   break;
        case "ADD EMPLOYEE":
          addEm();
          break;
        // case "REMOVE EMPLOYEE":
        //   rmvEm();
        //   break;
        case "ADD ROLE":
          addRole();
          break;
        // case "DELETE ROLE":
        //   dltRole();
        //   break;
        case "ADD DEPARTMENT":
          addDept();
          break;
          // case "DELETE DEPARTMENT":
          //   dltDept();
          break;
        case "UPDATE EMPLOYEE ROLE":
          updateEmRole();
          break;
        // case "UPDATE EMPLOYEE DEPARTMENT":
        //   updateEmDept();
        //   break;
        // case "UPDATE EMPLOYEE MANAGER":
        //   updateEmManager();
        //   break;
      }
    });
};
const viewAllEm = () => {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    startMenu();
  });
};
const viewAllRoles = () => {
  connection.query("SELECT * FROM role", function (err, data) {
    console.table(data);
    startMenu();
  });
};
const viewAllDepts = () => {
  connection.query("SELECT * FROM department", function (err, data) {
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
        message: "EMPLOYEE ROLE ID",
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
        },
        function (err, res) {
          if (err) throw err;
          startMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "EMPLOYEE TITLE",
      },
      {
        name: "salary",
        type: "input",
        message: "EMPLOYEE SALARY",
      },
      {
        name: "deptID",
        type: "input",
        message: "EMPLOYEE DEPARTMENT ID",
      },
    ])

    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO role SET ?`;
      connection.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptID,
        },
        function (err, res) {
          if (err) throw err;
          startMenu();
        }
      );
    });
};
const addDept = () => {
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "ENTER FULL DEPARTMENT NAME",
      },
    ])

    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO department SET ?`;
      connection.query(
        query,
        {
          full_name: answer.dept,
        },
        function (err, res) {
          if (err) throw err;
          startMenu();
        }
      );
    });
};
const updateEmRole = () => {
  inquirer
    .prompt([
      {
        message: "EMPLOYEE FIRST NAME",
        type: "input",
        name: "name",
      },
      {
        message: "EMPLOYEE LAST NAME",
        type: "input",
        name: "last",
      },
      {
        message: "enter the new role ID:",
        type: "number",
        name: "role_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name=?",
        [response.role_id, response.name, response.last],
        function (err, data) {
          console.table(data);
        }
      );
      startMenu();
    });
};

connection.connect((err) => {
  if (err) throw err;
  startMenu();
});
