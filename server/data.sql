CREATE DATABASE api

CREATE TABLE todos{
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(40),
    progress INT,
    date VARCHAR(300)
};

CREATE TABLE users{
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(40)
};