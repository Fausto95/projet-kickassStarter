DROP DATABASE IF EXISTS faustinontemokialungila;
CREATE DATABASE faustinontemokialungila;

\c users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  firstname VARCHAR,
  lastname VARCHAR,
  email VARCHAR UNIQUE,
  password VARCHAR,
  function VARCHAR

);

INSERT INTO users (firstname, lastname, email, password, function)
  VALUES ('Faustino', 'Yea', '3', 'M', 'rgr');