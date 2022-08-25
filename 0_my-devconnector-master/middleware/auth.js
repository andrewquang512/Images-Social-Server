const jwt = require('jsonwebtoken');
const config = require('config');

// ? since it is middleware func
//? it will take req, res, next
// ? middleware is a func access the request-response cycle
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check of not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
    // ? the next  is call because in other file
    //  ? we would use router.get('/', auth, async (req, res) =>{Hello World}
    // ? which mean we go here auth.js first then next() to get to Hello World
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
