CREATE DATABASE greatBay_DB;

USE greatBay_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 1", "Department 1", 3.75, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 2", "Department 1", 13.75, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 3", "Department 1", 3.65, 157);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 4", "Department 2", 8.75, 4150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 5", "Department 2", 7.77, 1750);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 6", "Department 2", 56.69, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 7", "Department 3", 83.75, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 8", "Department 3", 33.75, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 9", "Department 3", 93.71, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Test Product 10", "Department 4", 103.85, 8);
