const fs = require('fs');

const sessions = {};

const createSession = (req, res) => {
  const date = new Date();
  const sessionId = date.getTime();
  res.setHeader('set-cookie', `sessionId=${sessionId}`);
  const { username } = req.bodyParams;
  sessions[sessionId] = { sessionId, date: date.toLocaleString, username };
};

const loginHandler = (req, res, next) => {
  const { pathname } = req.url;
  const loginPage = fs.readFileSync('public/login.html', 'utf-8');
  const { cookie } = req.headers;

  if (pathname === '/guest-book') {
    if (!cookie && req.method === 'GET') {
      res.end(loginPage);
      return;
    }
  }

  const { username } = req.bodyParams;
  if (req.method === 'POST' && username) {
    createSession(req, res);
    res.statusCode = 302;
    res.setHeader('location', '/guest-book');
    res.end();
    return;
  }

  next();
};

const logoutHandler = (req, res, next) => {
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

module.exports = { loginHandler, logoutHandler };
