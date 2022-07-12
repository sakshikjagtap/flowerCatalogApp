const redirectTo = (res, location) => {
  res.statusCode = 302;
  res.setHeader('location', location);
  res.end();
}

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

    if (pathname === '/guest-book') {
      if (req.method === 'GET' && !req.session) {
        redirectTo(res, '/login.html');
        return;
      }
    }

    if (req.method === 'POST' && pathname === '/login') {
      const { username, password } = req.bodyParams;
      if (isvalidUser(username, password, users)) {
        createSession(req, res, sessions);
        redirectTo(res, '/guest-book');
        return;
      }
      redirectTo(res, '/login');
      return;
    }
    next();
  };
};

module.exports = { loginHandler, redirectTo };
