# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Running 
1. clone repo: `git clone https://github.com/pavelgorbach/nodejs2022Q4-service.git`
2. go to project forlder: `cd nodejs2022Q4-service.git`
3. checkout to postgre-orm branch `git checkout postgre-orm`
4. install dependencies `npm install`
5. run app `npm start` or `npm run start:dev`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Run Docker

Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/

Run command:

```
npm run docker
```