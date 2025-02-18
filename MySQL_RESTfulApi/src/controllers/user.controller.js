const bcrypt = require('bcryptjs');

const connection = require('../db-config');

const query = require('../utils/query');

const {
  GET_USER_BY_ID,
  GET_USER_WITH_PASSWORD_BY_ID,
} = require('../queries/user.queries');

const { UPDATE_USER } = require('../queries/auth.queries');

const { serverError } = require("../utils/handlers");


// get token
exports.getMe = async (req, res) => {
  // verify token
  const user = req.user;

  // result of middleware check
  if(user.id) {
    // make connection
    const con = await connection().catch((err) => {
      throw err;
  });

  const user = await query(con, GET_USER_BY_ID(req.user.user_id)
  ).catch(serverError(res));
    

  if (!user.length) {
    res
      .status(400)
      .json({ msg: 'user not found' });
  }
  res.json(user);
  }
};


exports.updateMe = async (req, res) => {
  // make connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check if user exists
  const user = await query(
    con, 
    GET_USER_WITH_PASSWORD_BY_ID(req.user.user_id)
  ).catch(serverError(res));

  // check for valid password
  const validPass = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch(serverError(res));

    if (!validPass) {
      const passwordHash = bcrypt.hashSync(req.body.password);

      // do update
      const result = await query(con, UPDATE_USER, [
        req.body.username,
        req.body.email,
        passwordHash,
        user[0].user_id,
      ]).catch(serverError(res));
      
      if (result.affectedRows === 1) {
        res
          .status(500)
        .json({ msg: `not able to update user details '${req.body.user_id}'`});
      }
      res.json(result)
    }
};