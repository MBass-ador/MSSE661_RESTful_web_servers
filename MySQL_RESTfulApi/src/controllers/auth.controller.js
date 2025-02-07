const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');

// set up new user
exports.registerUser = function(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password);
  
    con.query(
      authQueries.INSERT_NEW_USER,
      [req.body.username, req.body.email, passwordHash],
      function(err, result) {
        if (err) {
          //   stop registeration
          console.log(err);
          res
            .status(500)
            .send({ msg: 'Unable to register user. Please try again.' });
        }
        // check if created corectly
        con.query(userQueries.GET_USER_BY_NAME, [req.body.username], function(
          err,
          user
        ) {
          if (err) {
            res.status(500);
            res.send({ msg: 'Unable to retrieve user.' });
          }
  
          console.log(user);
          res.send(user);
        });
      }
    );
  };

// log in user
exports.login = function(req, res) {
    // check user exists
    console.log(req.body);
    con.query(
      userQueries.GET_USER_WITH_PASSWORD_BY_NAME,
      [req.body.username],
      function(err, user) {
        if (err) {
          res.status(500);
          res.send({ msg: 'Could not retrieve user.' });
        }
  
        console.log(user);
        //   validate entered password from database saved password (decrypted with secret)
        bcrypt
          .compare(req.body.password, user[0].password)
          .then(function(validPass) {
            if (!validPass) {
              res.status(400).send({ msg: 'Invalid Password.' });
            }
            //   create token
            const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
            res
              .header('auth-token', token) 
              .send({ auth: true, msg: 'Log in Successful.' });
          })
          .catch(console.log);
      }
    );
  };

// update user details
exports.updateUser = function(req, res) {
    // check if user exists
    console.log(req.user);
    con.query(
      userQueries.GET_USER_WITH_PASSWORD_BY_ID,
      [req.user.id],
      function(err, user) {
        console.log(err, user);
        if (err) {
          res.status(500);
          res.send({ msg: 'Could not retrieve user.' });
        }
  
        console.log(user);
        console.log(req.body.username);
        console.log(req.body.password);
  
        const hashedPassword = bcrypt.hashSync(req.body.password);
  
        // perform update
        con.query(
          authQueries.UPDATE_USER,
          [req.body.username, req.body.email, hashedPassword, user[0].id],
          function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send({ msg: 'Could not update user settings.' });
            }
            
            // confirm update
            console.log(result);
            res.json({ msg: 'User details updated succesfully!' });
          }
        );
      }
    );
  };
  
