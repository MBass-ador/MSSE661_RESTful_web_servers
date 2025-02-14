const bcrypt = require('bcryptjs');

const connection = require('../db-config');

const query = require('../utils/query');

const {
  GET_USER_BY_ID,
  GET_USER_WITH_PASSWORD_BY_ID,
} = require('../queries/user.queries');

const {UPDATE_USER} = require('../queries/auth.queries');

// get token
exports.getMe = async (req, res) => {
  // verify token
  const decoded = req.user;

  // result of middleware check
  if(decoded.id) {
    // make connection
    const con = await connection().catch((err) => {
      throw err;
    }
  );

  const user = await query(con, GET_USER_BY_ID, [decoded.id]).catch(
    (err) => {
      res.status(500);
      res.send({ msg: 'unable to retrieve user.' });
    }
  );

  if (!user.length) {
    res.status(400);
    res.send({ msg: 'no user found' });
  }
  res.status(200).send(user);
  }
};

exports.updateMe = async (req, res) => {
  // make connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check if user exists
  const user = await query(con, GET_USER_WITH_PASSWORD_BY_ID, 
    [req.user.id]).catch(
    (err) => {
      res.status(500);
      res.send({ msg: 'unable to retrieve user' });
    }
  );

  // check for valid password
  const validPass = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500)
      .json({ msg: 'invalid password' });
    });

    if (!validPass) {
      const passwordHash = bcrypt.hashSync(req.body.password);

      // do update
      const result = await query(con, UPDATE_USER, [
        req.body.username,
        req.body.email,
        passwordHash,
        user[0].user_id,
      ]).catch((err) => {
        res.status(500).send({ msg: 'unable to update user data' });
      });
      
      if (result.affectedRows === 1) {
        res.json({ msg: 'user updated successfully' });
      }
      res.json({ msg: 'no matching user to update'})
    }
};