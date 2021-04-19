DROP DATABASE IF EXIST employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
  id - INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id)
)




 