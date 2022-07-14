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
    if (req.method === 'GET' && req.url === '/signup') {
      redirectTo(res, '/signup.html')
      return;
    }

    if (req.method === 'POST' && req.url === '/signup') {
      addUser(req, res, users);
      return;
    }
    next();
  };
};

module.exports = { signupHandler };