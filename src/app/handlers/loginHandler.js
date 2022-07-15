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
  res.cookie('sessionId', sessionId);
  const { username } = req.bodyParams;
  sessions[sessionId] = { sessionId, date: date.toLocaleString, username };
};

const validateUser = () => {
  return (req, res, next) => {
    if (!req.session) {
      res.redirect('/login.html');
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
      res.status(200);
      res.end('login successful');
      return;
    }
    next();
  };
};

module.exports = { loginHandler, validateUser };
