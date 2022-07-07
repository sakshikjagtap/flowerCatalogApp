const injectSession = (req, res, next) => {
  const sessionId = req.cookies;
  if (sessionId) {
    req.session = sessionId;
  }
  next();
  return;
};

module.exports = { injectSession };