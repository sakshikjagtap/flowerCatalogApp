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

module.exports = { loginHandler };
