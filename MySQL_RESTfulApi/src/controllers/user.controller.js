const jwt = require('jsonwebtoken');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const queries = require('../queries/user.queries');

// get token
exports.getMe = function(req, res) {
  const token = req.headers['auth-token'];

  if (!token) {
    // stop user auth validation
    res.status(401).send({ auth: false, msg: 'No authentication token available.' });
  }
  // verify token
  jwt.verify(token, jwtconfig.secret, function(err, decoded) {
    if (err) {
      res
        .status(500)
        .send({ auth: false, message: 'Error authenticating token.' });
    }
    // if token valid, retrieve user
    con.query(queries.GET_USER_BY_ID, [decoded.id], function(err, user) {
      if (err) {
        res.status(500).send({ msg: 'Could not find user.' });
      }
      if (!user) {
        res.status(400).send({ msg: 'No user found.' });
      }
      res.status(200).send(user);
    });
  });
};