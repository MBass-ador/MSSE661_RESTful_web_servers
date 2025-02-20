// not used in this program version
// functionality moved to "user.queries"

// create new table:  user_id(pk), username, email, password
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

// add new user 
exports.INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

// change user details
exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?`;