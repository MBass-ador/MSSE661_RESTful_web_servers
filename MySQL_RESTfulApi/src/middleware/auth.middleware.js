const {
  jwtconfig,
  verifyToken,
} = require('../utils/jwt-helpers');

module.exports = (req, res, next) => {
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];

  if(!authHeader) {
    // if no token, abort authentication
    res
      .status(401)
      .send({ auth: false, msg: 'access denied, no valid access token.' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    // verify token
    const user = verifyToken(accessToken, jwtconfig.access, req, res);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).send({ msg: 'invalid token' });
  }
};