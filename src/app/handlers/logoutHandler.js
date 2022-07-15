const logoutHandler = (sessions) => {
  return (req, res, next) => {

    if (!req.session) {
      return;
    }
    const { sessionId } = req.session;
    delete sessions[sessionId];
    res.cookie('sessionId', 0, { 'Max-Age': 0 });
    res.redirect('/');
    return;
  }
};
module.exports = { logoutHandler };
