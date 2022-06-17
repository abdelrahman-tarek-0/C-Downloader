# A basic template for node back-end project 
contain the following: 
- "eslint" ESLint a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways with configuration (google style, prettier) check the '.eslintrc.js' file for more information also you can find the docs here [eslint](https://eslint.org/)
- "prettier" code style formatter with configuration (default for HTML, CSS, and JS formate) check the '.prettierrc.json' file for more information also you can find the docs here [prettier](https://prettier.io/)
- "nodemon" for live reload on the development phase, more info [nodemon](https://www.npmjs.com/package/nodemon)
- "Helmet" helps you secure your Express apps by setting various HTTP headers, more info [Helmet](https://www.npmjs.com/package/helmet)
- "express-rate-limit" for setting a limit on the requests, more info [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- "dotenv" module that loads environment variables from a .env file , more info [dotenv](https://www.npmjs.com/package/dotenv)
- "cors" CORS is a node.js package for providing a Connect/Express middleware that can be used to enable Cross-origin resource sharing with various options, more info [cors](https://www.npmjs.com/package/cors)
- "jasmine" for testing the code, more info [jasmine](https://www.npmjs.com/package/jasmine)
- "jasmine-spec-reporter" for better test readability, more info [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter)
- "supertest" to simulate a request for the testing, more info [supertest](https://www.npmjs.com/package/supertest)

Notes:
- this project is under development.
- anyone can contribute to this project and help to improve it.

Future plans:
- add a database (mongoDB or postgreSQL) ❌
- add a database migration system ❌
- add a authentication system ❌
- add unit test ✅
<br />


# Get started
### Download the following
-   Download and install [node.js](https://nodejs.org/en/)

### API Endpoints
_name_ <br/>
returns 'json object {message:"name api route"}' this is manly for test the Endpoint
```http
GET localhost:3000/api/name
```


### To start the project 

- Start the server to start using the api
 
In the root directory
```bash
npm run start:api
```
In the API directory
```bash
npm run start
```


### Environment Variables

-  you need to create .env file and put this inside it<br />
    PORT = 3000<br />
    ENV = dev<br />

### Port server
Server running on port `3000` <br />
The url is `http://localhost:3000`<br />


### Scripts


#### to use prettier and eslint for better code formatting
```bash
npm run format
```

#### To run the nodemon to watch for any changes in the dev phase

- In the root directory
```bash
npm run dev:api
```
- In the API directory
```bash
npm run dev
```
### Directory tree
<pre>
Directory
├───API
│   ├───spec
│   │   └───support
│   └───src
│       ├───handlers
│       ├───helpers
│       ├───middleware
│       ├───routes
│       │   ├───APIs
│       │   └───test
│       │       └───APIs
│       └───test
└───FrontEnd
    ├───assets
    ├───css
    ├───html
    └───js
</pre>