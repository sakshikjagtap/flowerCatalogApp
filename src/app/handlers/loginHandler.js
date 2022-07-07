const fs = require('fs');

const isvalidUser = (username, password, users) => {
  const user = users[username];

  if (!user) {
    return false;
  }

  if (user.password === password) {
    return true;
  }
  return false;
}

const createSession = (req, res, sessions) => {
  const date = new Date();
  const sessionId = date.getTime();
  res.setHeader('set-cookie', `sessionId=${sessionId}`);
  const { username } = req.bodyParams;
  sessions[sessionId] = { sessionId, date: date.toLocaleString, username };
};


const loginHandler = (sessions, users) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    const loginPage = fs.readFileSync('public/login.html', 'utf-8');
    const { cookie } = req.headers;

    if (pathname === '/guest-book') {
      if (!cookie && req.method === 'GET') {
        res.end(loginPage);
        return;
      }
    }

    const { username, password } = req.bodyParams;
    if (req.method === 'POST' && pathname === '/login') {
      if (isvalidUser(username, password, users)) {
        createSession(req, res, sessions);
        res.statusCode = 302;
        res.setHeader('location', '/guest-book');
        res.end();
        return;
      }
      if (!isvalidUser(username, password, users)) {
        res.end(loginPage);
        return;
      }
    }
    next();
  };
};

const logoutHandler = (sessions) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    const { sessionId } = req.session;

    if (pathname !== '/logout') {
      next();
      return;
    }

    delete sessions[sessionId];
    res.setHeader('Set-Cookie', 'sessionId=0;Max-Age=0');
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.end();
    return;
  };
};

const signupHandler = (users) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    const signupPage = fs.readFileSync('public/signup.html', 'utf-8')
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

module.exports = { loginHandler, logoutHandler, signupHandler };
