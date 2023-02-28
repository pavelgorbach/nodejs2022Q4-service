# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Running 

1. clone repo: `git clone https://github.com/pavelgorbach/nodejs2022Q4-service.git`
2. go to project forlder: `cd nodejs2022Q4-service.git`
3. checkout to postgre-orm branch `git checkout postgre-orm`
4. install dependencies `npm install`
5. run app with docker `npm run docker`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Vulnerabilities scanning

1. scan api `npm run scan:api`
2. scan db `npm run scan:db`

## Testing

To run all tests 

```
npm run test:auth
```

To run only one of all test suites

```
npm run test -- <path to suite>
```