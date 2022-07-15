const redirectTo = (res, location) => {
  res.statusCode = 302;
  res.setHeader('location', location);
  res.end(`Redirected to ${location}`);
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

const showLoginPage = () => {
  return (req, res, next) => {
    if (!req.session) {
      console.log('hello');
      redirectTo(res, '/login.html');
      return;
    };
    next();
  };
}

const loginHandler = (sessions, users) => {
  return (req, res, next) => {
    const { username, password } = req.bodyParams;
    if (isvalidUser(username, password, users)) {
      createSession(req, res, sessions);
      res.statusCode = 200;
      res.end('login successful');
      return;
    }
    next();
  };
};

module.exports = { loginHandler, redirectTo, showLoginPage };
