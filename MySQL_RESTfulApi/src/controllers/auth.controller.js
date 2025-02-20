//imports
const bcrypt = require('bcryptjs');

const connection = require('../db-config');

const {
  GET_USER_BY_NAME,
  GET_USER_WITH_PASSWORD_BY_NAME,
  INSERT_NEW_USER
} = require('../queries/user.queries');

const query = require('../utils/query');

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');

const { serverError } = require('../utils/handlers');

// function to set up new user
exports.register = async (req, res) => {
  // set parameters
  const passwordHash = bcrypt.hashSync(req.body.password);
  const params = [req.body.username, req.body.email, passwordHash];

  // make connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check if user already exists
  const user = await query(con, GET_USER_BY_NAME(req.body.username)
).catch(serverError(res));

  // if single response
  if (!user.length) {
    res
      .status(403)
      .send({ msg: 'user already exists' });
  } else {
    // add new user
    const user = await query(con, INSERT_NEW_USER, params)
    .catch(serverError(res));

    if (!result.length) {
      res
        .status(400)
        .send({ msg: 'unable to save user' });
    }
    res.json(user);
  }
};


// function to log in user
exports.login = async (req, res) => {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const user = await query(
      con, 
      GET_USER_WITH_PASSWORD_BY_NAME(req.body.username)
  ).catch(serverError(res));
    

  // if the user does not exist
  if (!user.length) {
    res
      .status(500)
      .send({ msg: 'unable to retrieve user' });
  } else {
    //   compare entered password with saved password from db
    const validPass = await bcrypt
      .compare(req.body.password, user[0].password)
      .catch(serverError(res));
    // if password invalid
    if (!validPass) {
      res
        .status(400)
        .send({ message: 'invalid password' });
    }
    // create token
    const accessToken = generateAccessToken(user[0].user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    const refreshToken = generateRefreshToken(user[0].user_id, {
      expiresIn: 86400,
    });

    refreshTokens.push(refreshToken);

    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .send({
        auth: true,
        msg: 'logged in',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 86400,
        refresh_token: refreshToken,
      });
  }
};

// function to refresh access token
exports.token = (req, res) => {
  const refreshToken = req.body.token;

   // stop user auth validation if no token
   if (!refreshToken) {
    res
      .status(401)
      .send({ auth: false, msg: 'access denied, no valid refresh token.' });
  }

  // stop refresh if refresh token invalid
  if (!refreshTokens.includes(refreshToken)) {
    res
      .status(403)
      .json({ msg: 'invalid refresh token' });
  }

  const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

  if (verified) {
    const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .send({
        auth: true,
        msg: 'logged in',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 20,
        refresh_token: refreshToken,
      });
  }
  // if bad token
  res
    .status(403)
    .send({ msg: 'invalid token' });
};

// function to log out user
exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  // remove token from refreshTokens
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

  res.send({ msg: 'logout successful' });
};
