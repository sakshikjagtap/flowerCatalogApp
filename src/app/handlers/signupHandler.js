const fs = require('fs');

const signupHandler = (users) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    const signupPage = fs.readFileSync('public/signup.html', 'utf-8');
    if (pathname !== '/signup') {
      next();
      return;
    }

    if (req.method === 'GET') {
      res.end(signupPage);
      return;
    }

    if (req.method === 'POST') {
      const { username, password } = req.bodyParams;
      if (username && password) {
        users[username] = { username, password };
        res.statusCode = 302;
        res.setHeader('location', '/guest-book');
        res.end();
        return;
      }
    }
  };
};

module.exports = { signupHandler };