const jwt = require('jsonwebtoken');

// jwt secrets for initial and refresh tokens
const jwtconfig = {
  access: 'supersecretaccesssecret',
  refresh: 'megasecretrefreshsecret',
};

// store for refresh tokens (multiple user's tokens)
const refreshTokens = [];

/**
 * expireIn is an object that can be a string or number in seconds
 *
 * usage: {@link https://www.npmjs.com/package/jsonwebtoken}
 *
 * example:
 *  { expiresIn: 86400 } for 24 hours in seconds
 */
// function to create new auth token
const generateAccessToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.access, expiresIn);

// function to create new refresh token
const generateRefreshToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.refresh, expiresIn);

// function to check if token is valid
const verifyToken = (token, secret, req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).json({ auth: false, message: 'Invalid token.' });
  }
};

// export jwt helpers
module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};