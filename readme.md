<p align="center">
<img src="./public/img/presentation.jpg" width="400" alt="Nest Logo" />
</p>

# Project - 02 motors repairs - App

## Project Description

This project is an API for a vehicle repair company, which will allow users to register if they are an employee or user, start a section, schedule appointments for vehicle maintenance, add what they want to perform in that maintenance, go to the user profile and View your pending and completed appointments.
The application is built using node.js express.js and uses PostgresSQL as a database to store the information

[Here you will find the API documentation, click here to use it in your projects](https://documenter.getpostman.com/view/28473907/2s9YRB1rJM)

## Main characters

1. register user

2. start section with a user

3. create an appointment for repair

4. update user

5. Update repair status (only if the user is an employee)

# Used technology

1. express: a minimalist node.js framework that makes it easy to create web applications and APIs.

2. express-rate-limit: is a middleware used to limit repeated requests to public APIs and/or endpoints such as authentication and password reset.

3. express-validator: It is a data validation middleware for Express. Provides validation and sanitization of input data.

4. helmet - is a security middleware that helps protect Express/Connect applications from some of the known web vulnerabilities by setting appropriate HTTP headers.

5. postgreSQL: is an open source, object-oriented relational database management system.

6. sequelize: An ORM (Object Relational Mapper) for SQL databases. which simplifies working with SQL databases by writing JavaScript code instead of SQL.

7. jsonwebtoken – is a JSON Web Tokens (JWT) implementation for Node.js that allows the creation and verification of JWT tokens.

## Prerequisites for using the project

1. have node.js installed

2. have postgresSQL installed

3. have a database created in postgresSQL

## How to execute the project in development

1. clone the repository

2. run the following command to install the dependencies:

```

  npm install

```

3. create a local database in postgreSQL

4. clone the .env.template and rename it to .env and fill the environment variables

5. Wake up development mode with the following command:

```

  npm run start:dev

```
