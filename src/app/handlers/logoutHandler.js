const logoutHandler = (sessions) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    const { sessionId } = req.session;

    if (pathname === '/logout') {
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
