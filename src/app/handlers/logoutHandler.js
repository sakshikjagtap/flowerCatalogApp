const logoutHandler = (sessions) => {
  return (req, res, next) => {
    const { pathname } = req.url;

    if (pathname === '/logout') {
      if (!req.session) {
        return;
      }

      const { sessionId } = req.session;
      delete sessions[sessionId];
      res.setHeader('Set-Cookie', 'sessionId=0;Max-Age=0');
      res.statusCode = 302;
      res.setHeader('location', '/');
      res.end();
      return;
    }
    next();
    return;
  };
};
module.exports = { logoutHandler };
