const express = require('express');

const { postComment, showGuestBook } = require('./app/handlers/handleRequest.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const { loadResources } = require("./app/handlers/loadResources");
const { showLoginPage, loginHandler } = require("./app/handlers/loginHandler");
const { logoutHandler } = require('./app/handlers/logoutHandler')
const { showSignupPage, signupHandler } = require('./app/handlers/signupHandler')
const { injectCookies } = require('./app/handlers/parseCookie.js');
const { injectSession } = require('./app/handlers/injectSession.js');
const req = require('express/lib/request');

const injectBodyParams = (req, res, next) => {
  req.bodyParams = req.body;
  next();
  return;
};

const createApp = (config, { read, write }, { sessions, users }) => {
  const app = express();
  app.use(loadResources(config.guestBookSrc, read));

  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.urlencoded({ extended: true }), injectBodyParams);
  app.post('/login', loginHandler(sessions, users));

  app.get('/signup', showSignupPage(users));
  app.post('/signup', signupHandler(users));

  const router = express.Router();
  app.use('/guest-book', router);
  router.use('/', showLoginPage());
  router.get('/', showGuestBook(config.guestBook, read),);
  router.post('/', postComment(config.guestBookSrc, config.guestBook, write),)

  app.use(express.static('public'));
  app.get('/api*', apiHandler)
  return app;
}

module.exports = { createApp };