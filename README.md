<br />
  <h1 align="center">Insurance Package</h1>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Done With](#done-with)
- [Getting Started](#getting-started)
  - [Pre Requisites](#pre-requisites)
  - [Tests](#tests)
- [File Structure](#file-structure)
  - [Architecture](#architecture)
  - [Fisrt Level](#first-level)
  - [Second Level](#second-level)
  - [Third Level](#third-level)
  - [Complete File Structure](#complete-file-structure)

## About The Project

This project aims to be the back-end of a customized insurance package application, having at the moment as a duty, to generate a risk profile for the user, returning the ideal plan according to the data obtained.

### Done With

Below is what was used to create this project:

- [TypeScript] - TypeScript is a super typed JavaScript set and was chosen because it is easier to find errors and work with object-oriented programming;
- [Node.Js] - The node was the environment chosen to run the language I chose for the project;
- [Ts-Node] - Transpacks TypeScript code to Javascript making the process more efficient;
- [Ts-Node-Dev] - It is a tool that compiles your projects with Typescript and restarts the project when the file is modified;
- [Express] - It was used to manage http requests;
  - [Celebrate] - Is an express middleware function that ensures that all of your entries are correct before any function of the handler;
- [Cors] - It is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated;
- [Dotenv] - Dotenv allows us to load information from the .env file;
- [Helmet] - The helmet configures HTTP headers and brings more security to the application;
- [Moment] - Library for working with dates;
- [Chai] - Chai is a library designed to facilitate the development of tests;
- [Chai-Http] - Chai-Http helps in the development of tests involving http requests;
- [Mocha] - Mocha is a JavaScript test framework for Node.js programs;
- [Nyc] - Helped to identify test coverage;
- [EsLint] - A linter tool for identifying and reporting on patterns in JavaScript;
  - [eslint-config-standard] - This package provides Standard's .eslintrc as an extensible shared configuration;
  - [eslint-plugin-standard] - ESLint plugin with rules Standard;
  - [eslint-plugin-import] - ESLint plugin with rules to help import validation;
  - [eslint-plugin-node] - Additional ESLint's rules for Node.js;
  - [eslint-plugin-promise] - Enforce best practices for JavaScript promises.

<!-- GETTING STARTED -->

## Getting Started

To be able to execute the project follow the steps below.

### Pre Requisites

First of all have Node.Js installed on the machine
To run the project give 'npm i' and then 'npm start'.

### Routes

I considered the request as a POST due to the type of data sent, in JSON format and in the concept of developing a risk profile.

POST /v1/insurance-package/risk-profile

This route creates a risk profile

At the input we expect to receive a JSON payload like this:

```bash
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

At the output on sucess (200) we return a JSON payload look like this:

```bash
{
    "erro": false,
    "result": {
        "auto": "regular",
        "disability": "economic",
        "home": "economic",
        "life": "regular"
    }
}
```

On server error (500) we return

```bash
{
  "message": "Internal Server Error",
}
```

And on validation error (400) we return

```bash
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "celebrate request validation failed",
    "validation": {
        "body": {
            "source": "body",
            "keys": [
                "age"
            ],
            "message": "\"age\" is required"
        }
    }
}

```

### Tests

I tested my module using the .spec file for unit testing and .test for integration testing.

- [To run all tests] give 'npm run test';
- [To run only the unit tests] give 'npm run test: unit';
- [To run only the integration tests] give 'npm run test: integration';
- [To see the test coverage] give 'npm run test: coverage'.

---

## File Structure

### Architecture

The architecture used was inspired by the principles of SOLID, separating responsibilities and valuing the isolation of technologies, thus facilitating maintenance and navigation by code.

### First Level

At the first level we have the docs folder where I kept the input and output models, we have the project root with the folders divided between modules, where the whole business rule will happen, shared where we can store everything that is reusable and types where we store the main types.

```bash
insurance-package
├── docs/
└── src/
    ├── modules/
    ├── shared/
    └── types/
```

### Second Level

Here in the modules we separate our main logic at the moment which is the risk profile generated in the request, and in the shared one we separate the method used to calculate the risk and convert the score to the plans we have, I separated this in the shared one because I considered it can be reused in other logic and that would be as services, we also have everything related to error handling, utilities and infrastructure.

```bash
insurance-package
├── docs/
└── src/
    ├── modules/
    │   └── risk-profile/
    ├── shared/
    │   ├── calculate-risk-score/
    │   ├── convert-score-to-plan/
    │   ├── errors/
    │   ├── infra/
    │   └── utils/
    └── types/
        └── index.enum.ts
```

### Third Level

In the risk profile module we have the data that are the exit and entry interfaces, the infra folder where we keep everything related to that module's http as controllers and specific routes and the useCases folder, where it stores all the application logic.
In shared calculate-risk-score and convert-score-to-plan you will have interfaces to ensure that in implementations everything is configured, I wanted to separate it into classes to make it easier to change values ​​or look for logic.
And in the infra we have the general http configuration for the application.

```bash
insurance-package
├── docs/
│   ├── input.json
│   └──  output.json
└── src/
    ├── modules/
    │   └── risk-profile/
    │       ├── dtos/
    │       ├── infra/
    │       └── useCases/
    ├── shared/
    │   ├── calculate-risk-score/
    │   │   ├── implementations/
    │   │   └── calculate-risk-score.interface.ts
    │   ├── convert-score-to-plan/
    │   │   ├── implementations/
    │   │   └── convert-score-to-plan.interface.ts
    │   ├── errors/
    │   │   ├── error.class.ts
    │   │   └── error.service.ts
    │   ├── infra/
    │   │   └── http/
    │   └── utils/
    │       └── utils.service.ts
    └── types/
        └── index.enum.ts
```

### Complete File Structure

```bash
insurance-package
├── docs/
│   ├── input.json
│   └──  output.json
├── src/
│   ├── modules/
│   │   └── risk-profile/
│   │       ├── dtos/
│   │       │   └── create-risk-profile.dto.ts
│   │       ├── infra/
│   │       │   └── http/
│   │       │       ├── controllers/
│   │       │       │   └── create-risk-profile.controller.ts
│   │       │       └── routes/
│   │       │           ├── schemas/
│   │       │           │   └── create-risk-profile.schema.ts
│   │       │           └── create-risk-profile.routes.ts
│   │       └── useCases/
│   │           ├── create-risk-profile.useCase.spec.ts
│   │           ├── create-risk-profile.useCase.test.ts
│   │           └── create-risk-profile.useCase.ts
│   ├── shared/
│   │   ├── calculate-risk-score/
│   │   │   ├── implementations/
│   │   │   │   └── calculate-risk-score.service.ts
│   │   │   └── calculate-risk-score.interface.ts
│   │   ├── convert-score-to-plan/
│   │   │   ├── implementations/
│   │   │   │   └── convert-score-to-plan.service.ts
│   │   │   └── convert-score-to-plan.interface.ts
│   │   ├── errors/
│   │   │   ├── error.class.ts
│   │   │   └── error.service.ts
│   │   ├── infra/
│   │   │   └── http/
│   │   │       ├── routes/
│   │   │       │   └── index.ts
│   │   │       └── server.ts
│   │   └── utils/
│   │       └── utils.service.ts
│   └── types/
│       └── index.enum.ts
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
