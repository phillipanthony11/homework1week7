DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) DEFAULT 60000,
    department_id INT,
    FOREIGN KEY (department_id)REFERENCES departments (id)
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employee_first VARCHAR(30) NOT NULL,
    employee_last VARCHAR(30) NOT NULL,
    employee_role_id INT NOT NULL,
    FOREIGN KEY (employee_role_id)REFERENCES roles (id),
    manager_id INT ,
    FOREIGN KEY (manager_id) REFERENCES employees (id)
   
);