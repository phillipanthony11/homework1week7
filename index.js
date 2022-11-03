const inquirer = require("inquirer");
const fs = require('fs');

function askQuestion(){
    inquirer.prompt([
        {
            type:'list',
            message:'What would you like to do?',
            name:'employeeType',
            choices: ["View all departments","View all roles","view all employees","Add a department", "Add a role","Add an employee","Update an employee role"]
        },

    ]).then((answers)=> {
        switch (answers.employeeType)  {

            case "View all departments":
            console.log("View all departments")
            viewDepartments();
            break;

            case "View all roles":
            console.log("View all roles")
            viewRoles();
            break;

            case "View all employees":
            console.log("View all employees")
            viewEmployees();
            break;

            case "Add a department":
            console.log("Add a department")
            addDepartment();
            break;

            case "Add a role":
            console.log("Add a role")
            addRole();
            break;

            case "Add an employee":
            console.log("Add an employee")
            addEmployee();
            break;

            case "Update an employee role":
            console.log("Update an employee role")
            updateEmployee();
            break; 
        }})}


function viewDepartments(){
    // GET from Departments table
}
function viewRoles(){
    // GET from roles table
}
function viewEmployees(){
    // GET from Employees table 
}
function addDepartment(){
    // POST to departments
}
function addRole(){
    // POST to roles
}
function addEmployee(){
    // POST to employees
}
function updateEmployee(){
    // UPDATE employees
}