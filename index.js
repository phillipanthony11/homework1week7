const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
const mysql = require("mysql2");
const { response } = require("express");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

function askQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "employeeType",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.employeeType) {
        case "View all departments":
          console.log("View all departments");
          viewDepartments();
          break;

        case "View all roles":
          console.log("View all roles");
          viewRoles();
          break;

        case "View all employees":
          console.log("View all employees");
          viewEmployees();
          break;

        case "Add a department":
          console.log("Add a department");
          addDepartment();
          break;

        case "Add a role":
          console.log("Add a role");
          addRole();
          break;

        case "Add an employee":
          console.log("Add an employee");
          addEmployee();
          break;

        case "Update an employee role":
          console.log("Update an employee role");
          updateEmployee();
          break;
      }
    });
}

function viewDepartments() {
  // GET from Departments table

  const sql = `SELECT id, department_name AS title FROM departments`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    askQuestion();
  });
}
function viewRoles() {
  // GET from roles table
  const sql = `SELECT id, role_name AS title, salary AS salary  FROM roles`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);

      return;
    }
    console.table(rows);
    askQuestion();
  });
}
function viewEmployees() {
  // GET from Employees table
  console.log("test");
  const sql = `SELECT employee_role_id AS RoleID, employee_last AS LastName, employee_first AS FirstName FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);

      return;
    }
    console.table(rows);
    askQuestion();
  });
}
function addDepartment() {
  // POST to departments
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "departmentName",
      },
    ])
    .then((res) => {
      const sql = `INSERT INTO departments (department_name)
    VALUES (?)`;
      const params = [res.departmentName];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("department added");
        askQuestion();
      });
    });
}
function addRole() {
  // POST to roles
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What will be the department ID?",
        name: "department_id",
      },
    ])
    .then((res) => {
      const sql = `INSERT INTO roles (role_name, salary, department_id)
    VALUES (?)`;
      const params = [res.roleName, res.salary, res.department_id];
      db.query(sql, [params], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("role added");
        askQuestion();
      });
    });
}
function addEmployee() {
  // POST to employees
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What is the first name of the employee you would like to add?",
        name: "employee_first",
      },
      {
        type: "input",
        message: "What is the last name of the employee you would like to add?",
        name: "employee_last",
      },
      {
        type: "input",
        message: "What the role ID for the new employee?",
        name: "employee_role_id",
      },
      {
        type: "input",
        message: "What the manager ID for the new employee?",
        name: "manager_id",
      },
    ])
    .then((res) => {
      const sql = `INSERT INTO employees (employee_first, employee_last, employee_role_id, manager_id)
  VALUES (?)`;
      const params = [
        res.employee_first,
        res.employee_last,
        res.employee_role_id,
        res.manager_id,
      ];
      db.query(sql, [params], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Employee added");
        askQuestion();
      });
    });
}
function updateEmployee() {
  // UPDATE employees
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What is the first name of the employee you would like to update?",
        name: "employeeName",
      },
    ])
    .then((res) => {
      const isExistingEmployee = db
        .promise()
        .query(
          "SELECT employee_first, id,  employee_role_id from employees WHERE employee_first = ?",
          [res.employeeName]
        );
      if (!isExistingEmployee) {
        console.log("Employee does not exist", isExistingEmployee);
        process.exitCode = 1;
        process.exit();
      }
      console.log(isExistingEmployee);
      return isExistingEmployee;
    })
    .then((employee) => {
      console.log(employee);

      const sql = `INSERT INTO employees (role)
    VALUES (?)`;
      console.log(res);
      db.query(sql, res.employeeName, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("employee added");
        askQuestion();
      });
    });
}

askQuestion();
