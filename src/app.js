const express = require('express');

const { guestBookRouter, createApiRouter } = require('./app/handlers/router.js');
const { readComments } = require("./app/handlers/loadResources");
const { loginHandler } = require("./app/handlers/loginHandler");
const { logoutHandler } = require('./app/handlers/logoutHandler')
const { showSignupPage, signupHandler }
  = require('./app/handlers/signupHandler')
const { injectCookies } = require('./app/handlers/parseCookie.js');
const { injectSession } = require('./app/handlers/injectSession.js');

const injectBodyParams = (req, res, next) => {
  req.bodyParams = req.body;
  next();
  return;
};

const createApp = (config, { read, write }, { sessions, users }) => {
  const app = express();
  const comments = readComments(config.guestBookSrc, read);

  app.use((req, res, next) => { console.log(req.method, req.url); next(); });
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.urlencoded({ extended: true }), injectBodyParams);

  app.post('/login', loginHandler(sessions, users));
  app.get('/logout', logoutHandler(sessions));

  app.get('/signup', showSignupPage(users));
  app.post('/signup', signupHandler(users));

  app.use('/guest-book', guestBookRouter(config, { read, write }, comments));
  app.use('/api', createApiRouter(comments));
  app.use(express.static('public'));

  return app;
}

module.exports = { createApp };