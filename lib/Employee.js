// TODO: Write code to define and export the Employee class
class Employee {
  constructor(nameVal, idVal, emailVal) {
    this.name = nameVal;
    this.id = idVal;
    this.email = emailVal;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}
module.exports = Employee;
