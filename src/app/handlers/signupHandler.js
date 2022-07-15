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

const showSignupPage = (users) => {
  return (req, res, next) => {
    redirectTo(res, '/signup.html')
    return;
  }
};

const signupHandler = (users) => {
  return (req, res, next) => {
    addUser(req, res, users);
    return;
  };
};

module.exports = { signupHandler, showSignupPage };