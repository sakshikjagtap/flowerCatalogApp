const { redirectTo } = require('./loginHandler');

const addUser = (req, res, users) => {
  const { username, password } = req.bodyParams;

  if (users[username]) {
    res.statusCode = 409;
    res.end('already exist');
    return;
  }

  res.statusCode = 200;
  users[username] = { username, password };
  res.end('signup successful');
  return;
};

const signupHandler = (users) => {
  return (req, res, next) => {

    if (req.matches('GET', '/signup')) {
      redirectTo(res, '/signup.html')
      return;
    }

    if (req.matches('POST', '/signup')) {
      addUser(req, res, users);
      return;
    }
    next();
  };
};

module.exports = { signupHandler };