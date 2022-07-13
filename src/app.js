const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound } = require('./app/handlers/notFound.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const { loadResources } = require("./app/handlers/loadResources");
const { loginHandler } = require("./app/handlers/loginHandler");
const { logoutHandler } = require('./app/handlers/logoutHandler')
const { signupHandler } = require('./app/handlers/signupHandler')
const { injectBodyParams } = require('./app/handlers/injectBodyParser.js');
const { injectCookies } = require('./app/handlers/parseCookie.js');
const { injectSession } = require('./app/handlers/injectSession.js');
const { createRouter } = require('./server/router.js');

const app = (config) => {
  const handlers = [loadResources(config.guestBookSrc, config.read),
    injectCookies,
    injectBodyParams,
  injectSession(config.sessions),
  loginHandler(config.sessions, config.users),
  signupHandler(config.users),
  logoutHandler(config.sessions),
  guestBookHandler(config.guestBookSrc, config.guestBook, config.write, config.read),
    apiHandler,
    serveFileContent,
    notFound];
  return createRouter(handlers);
}

module.exports = { app };