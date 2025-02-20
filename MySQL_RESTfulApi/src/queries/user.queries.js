// create new table:  user_id(pk), username, email, password
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

// get user by id (does not return password)
exports.GET_USER_BY_ID = `SELECT user_id, username, email FROM users WHERE user_id = ?`;

// get user by name (does not return password)
exports.GET_USER_BY_NAME = `SELECT user_id, username, email FROM users WHERE username = ?`;

// get user by id (including password)
exports.GET_USER_WITH_PASSWORD_BY_ID = `SELECT * FROM users WHERE user_id = ?`;

// get user by name (including password)
exports.GET_USER_WITH_PASSWORD_BY_NAME = `SELECT * FROM users WHERE username = ?`;

// add new user 
exports.INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

// change user details
exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?`;