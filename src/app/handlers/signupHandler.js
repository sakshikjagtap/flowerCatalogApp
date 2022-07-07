const { redirectTo } = require('./loginHandler');

const addUser = (req, res, users) => {
  const { username, password } = req.bodyParams;
  if (!username && !password) {
    return;
  }
  users[username] = { username, password };
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
      redirectTo(res, '/guest-book');
      return;
    }
    next();
  };
};

module.exports = { signupHandler };