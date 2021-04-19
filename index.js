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
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "What is the item you would like to submit?",
    },
    {
      name: "category",
      type: "input",
      message: "What category would you like to place your auction in?",
    },
    {
      name: "startingBid",
      type: "input",
      message: "What would you like your starting bid to be?",
      validate(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    },
  ]);
  // .then((answer) => {
  //   // when finished prompting, insert a new item into the db with that info
  //   connection.query(
  //     "INSERT INTO auctions SET ?",
  //     // QUESTION: What does the || 0 do?
  //     {
  //       item_name: answer.item,
  //       category: answer.category,
  //       starting_bid: answer.startingBid || 0,
  //       highest_bid: answer.startingBid || 0,
  //     },
  //     (err) => {
  //       if (err) throw err;
  //       console.log("Your auction was created successfully!");
  //       // re-prompt the user for if they want to bid or post
  //       start();
  //     }
  //   );
  // });
};

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startMenu();
});
