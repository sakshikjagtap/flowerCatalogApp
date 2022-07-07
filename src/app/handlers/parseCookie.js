const parseCookies = (rawCookies) => {
  const cookies = {};
  if (!rawCookies) {
    return cookies;
  }

  const allCookies = rawCookies.split(';');
  allCookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  const { cookie } = req.headers;
  req.cookies = parseCookies(cookie);
  next();
};

module.exports = { injectCookies };