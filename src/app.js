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

const app = (config, fileOperations, details) => {
  const handlers = [loadResources(config.guestBookSrc, fileOperations.read),
    injectCookies,
    injectBodyParams,
  injectSession(details.sessions),
  loginHandler(details.sessions, details.users),
  signupHandler(details.users),
  logoutHandler(details.sessions),
  guestBookHandler(config.guestBookSrc, config.guestBook, fileOperations.write, fileOperations.read),
    apiHandler,
    serveFileContent,
    notFound];
  return createRouter(handlers);
}

module.exports = { app };