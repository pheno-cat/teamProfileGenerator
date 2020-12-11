// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(nameVal, idVal, emailVal, gitHubVal) {
    super(nameVal, idVal, emailVal);
    this.github = gitHubVal;
  }
  getRole() {
    return "Engineer";
  }
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
