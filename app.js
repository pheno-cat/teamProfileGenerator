const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

start();
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want any more members",
        ],
        name: "initialChoice",
      },
    ])
    .then((choiceResponse) => {
      console.log(choiceResponse.initialChoice);
      if (choiceResponse.initialChoice !== "I don't want any more members") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What's the new Employee name?",
              name: "name",
            },
            {
              message: "What's their Employee ID Number?",
              name: "id",
            },
            {
              message: "What's their Employee email?",
              name: "email",
            },
          ])
          .then((basicQuestions) => {
            if (choiceResponse.initialChoice == "Manager") {
              inquirer
                .prompt([
                  {
                    message: "Office number plz: ",
                    name: "officeNumber",
                  },
                ])
                .then((managerInfo) => {
                  const manager = new Manager(
                    basicQuestions.name,
                    basicQuestions.id,
                    basicQuestions.email,
                    managerInfo.officeNumber
                  );
                  employees.push(manager);
                  start();
                });
            } else if (choiceResponse.initialChoice == "Intern") {
              inquirer
                .prompt([
                  {
                    message: "Please enter school name: ",
                    name: "getSchool",
                  },
                ])
                .then((internInfo) => {
                  const intern = new Intern(
                    basicQuestions.name,
                    basicQuestions.id,
                    basicQuestions.email,
                    internInfo.getSchool
                  );
                  employees.push(intern);
                  start();
                });
            } else if (choiceResponse.initialChoice == "Engineer") {
              inquirer
                .prompt([
                  {
                    message: "Please enter GitHub username: ",
                    name: "getGithub",
                  },
                ])
                .then((engineerInfo) => {
                  const engineer = new Engineer(
                    basicQuestions.name,
                    basicQuestions.id,
                    basicQuestions.email,
                    engineerInfo.getGithub
                  );
                  employees.push(engineer);
                  start();
                });
            }
          });
      } else {
        fs.writeFile(outputPath, render(employees), (err) => {
          if (err) throw err;
          console.log("done!");
        });
      }
    });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
