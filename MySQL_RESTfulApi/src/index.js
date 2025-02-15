// imports
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

const testRoutes = require("./routes/testing.routes");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const {
        error404, 
        error500
} = require("./middleware/errors.middleware");


// set up app w express  port: 3000  logLevel: dev
const app = express();
port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";
const env = process.env.NODE_ENV;

// log server requests : If not in test environment.
if (env !== "test") {
  app.use(logger(logLevel));
}


// parse requests  https:github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// facilitate connectiion to website
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);      // http://localhost:3000/api/auth
app.use('/api/users', userRoutes);    // http://localhost:3000/api/users
app.use('/api/testing', testRoutes); // http://localhost:3000/api/testing

// handle certain errors via middleware
app.use(error404);
app.use(error500);

// listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});