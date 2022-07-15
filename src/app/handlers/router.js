const express = require('express');
const { showCommentsApi, showFlowersApi, showApi } = require('./apiHandler');
const { validateUser, loadComments, showGuestBook, postComment }
  = require('./handleRequest');

const createApiRouter = (comments) => {
  const apiRouter = express.Router();
  apiRouter.get('/', showApi);
  apiRouter.get('/flowers', showFlowersApi);
  apiRouter.get('/comment', showCommentsApi(comments));
  return apiRouter;
};

const guestBookRouter = (config, { read, write }, comments) => {
  const router = express.Router();
  router.use(validateUser());
  router.use(loadComments(comments));
  router.get('/', showGuestBook(config.guestBook, read));
  router.post('/', postComment(config.guestBookSrc, write));
  return router;
};

module.exports = { createApiRouter, guestBookRouter };
