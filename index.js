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
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices() {
            const choiceArray = ["exit"];
            results.forEach(({ first_name }) => {
              choiceArray.push(first_name);
            });
            return choiceArray;
          },
          message: "ALL EMPLOYEES",
        },
        {
          name: "return",
          type: "confirm",
          message: "RETURN TO MAIN MENU?",
        },
      ])
      .then((answer) => {
        console.log(answer.return);
        startMenu();
      });
  });
};

const addEm = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "EMPLOYEE FIRST NAME",
      },
      {
        name: "lastname",
        type: "input",
        message: "EMPLOYEE LAST NAME",
      },
      {
        name: "role",
        type: "input",
        message: "EMPLOYEE'S ROLE",
      },
      {
        name: "manager",
        type: "input",
        message: "EMPLOYEE'S MANAGER (IF NO MANAGER EXIST, DISREGARD) ",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee ?",

        {
          first_name: answer.firstName,
        },
        (err) => {
          if (err) throw err;
          console.log("You did it yayyyy!");
          startMenu();
        }
      );
    });
};

connection.connect((err) => {
  if (err) throw err;
  startMenu();
});
