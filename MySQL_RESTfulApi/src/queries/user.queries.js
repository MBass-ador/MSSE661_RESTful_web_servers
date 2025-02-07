// get user by id (does not return password)
exports.GET_USER_BY_ID = `SELECT user_id, username, email FROM users WHERE user_id = ?`;

// get user by name (does not return password)
exports.GET_USER_BY_NAME = `SELECT user_id, username, email FROM users WHERE username = ?`;

// get user by id (including password)
exports.GET_USER_WITH_PASSWORD_BY_ID = `SELECT * FROM users WHERE user_id = ?`;

// get user by name (including password)
exports.GET_USER_WITH_PASSWORD_BY_NAME = `SELECT * FROM users WHERE username = ?`;