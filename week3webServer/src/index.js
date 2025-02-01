// imports
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const tasksRoutes = require("./routes/tasks.routes");
const middleware = require("./middleware/errors.middleware");


// set up app  port: 3000  logLevel: dev
const app = express();
port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

// log server requests
app.use(logger(logLevel));

// parse requests  https:github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes http://localhost:3000/tasks
app.use('tasks', tasksRoutes);

// handle errors via middleware
app.use(middleware.error404);
app.use(middleware.error500);

// listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

