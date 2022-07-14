const express = require('express');

const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const { loadResources } = require("./app/handlers/loadResources");
const { loginHandler } = require("./app/handlers/loginHandler");
const { logoutHandler } = require('./app/handlers/logoutHandler')
const { signupHandler } = require('./app/handlers/signupHandler')
const { injectCookies } = require('./app/handlers/parseCookie.js');
const { injectSession } = require('./app/handlers/injectSession.js');
const req = require('express/lib/request');

const injectBodyParams = (req, res, next) => {
  req.bodyParams = req.body;
  next();
  return;
};

const createApp = (config, fileOperations, details) => {
  const app = express();
  app.use(loadResources(config.guestBookSrc, fileOperations.read));

  app.use(injectCookies);
  app.use(injectSession(details.sessions));
  app.use(express.urlencoded({ extended: true }), injectBodyParams);
  app.get('/guest-book', loginHandler(details.sessions, details.users));
  app.post('/login', loginHandler(details.sessions, details.users));
  app.get('/signup', signupHandler(details.users));
  app.post('/signup', signupHandler(details.users));
  app.get('/guest-book', guestBookHandler(config.guestBookSrc, config.guestBook, fileOperations.write, fileOperations.read),)
  app.post('/guest-book', guestBookHandler(config.guestBookSrc, config.guestBook, fileOperations.write, fileOperations.read),)
  app.use(express.static('public'));
  app.get('/api*', apiHandler)
  return app;
}

module.exports = { createApp };