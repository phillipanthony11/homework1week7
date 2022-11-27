USE company_db;

INSERT INTO departments ( department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (department_id, role_name, salary)
VALUES (1,"Sales Lead", 10000),
       (1,"Salesperson", 80000),
       (2,"Lead Engineer", 150000),
       (2,"Software Engineer", 120000),
       (3,"Acount Manager", 160000),
       (3,"Acountant",  125000),
       (4,"Legal Team Lead", 250000),
       (4,"Lawyer", 190000);

INSERT INTO employees (employee_last, employee_first, employee_role_id, manager_id)
VALUES ("Doe", "John", 1, NULL),
        ("Doe", "Jane", 2, 1),
        ("Bach", "Sebatian", 1, NULL);
