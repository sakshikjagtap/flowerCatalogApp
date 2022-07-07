const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound } = require('./app/handlers/notFound.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const { loadResources } = require("./app/handlers/loadResources");
const { loginHandler, logoutHandler, signupHandler } = require("./app/handlers/loginHandler");
const { injectBodyParams } = require('./app/handlers/injectBodyParser.js');
const { injectCookies } = require('./app/handlers/parseCookie.js');
const { injectSession } = require('./app/handlers/injectSession.js');

const guestBookSrc = 'comment.json';
const guestBook = 'src/app/guest-book.html';
const sessions = {};
const users = {};

const handlers = [loadResources(guestBookSrc), injectCookies, injectBodyParams, injectSession, loginHandler(sessions, users), signupHandler(users), logoutHandler(sessions), guestBookHandler(guestBookSrc, guestBook), apiHandler, serveFileContent, notFound];

module.exports = { handlers };