// Definng SQL queries for mysql database

// create a table "tasks" 
// with id, name, created_date, and status columns
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks (
    id int Not Null AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status varchar(10) DEFAULT 'pending',
    PRIMARY KEY (id);
)`;

//get all tasks
exports.All_Tasks = `SELECT * FROM tasks`;

// get a single task
exports.SINGLE_TASKS = `SELECT * FROM tasks WHERE id = ?`;

// insert a task
exports.INSERT_TASK = `INSERT INTO tasks (name) VALUES (?)`;

// update a task
exports.UPDATE_TASK = `UPDATE tasks SET name = ?, status = ? WHERE id = ?`;

// delete a task
exports.DELETE_TASK = `DELETE FROM tasks WHERE id = ?`; 