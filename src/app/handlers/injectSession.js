const injectSession = (sessions) => (req, res, next) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    req.session = sessions[sessionId];
  }
  next();
  return;
};

module.exports = { injectSession };