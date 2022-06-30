const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound, invalidMethod } = require('./app/handlers/notFound.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const fs = require('fs');

const guestBookSrc = 'comment.json';
const guestBook = 'src/app/guest-book.html';

const loadResources = (guestBookSrc) => {
  const comments = JSON.parse(fs.readFileSync(guestBookSrc, 'utf-8'));
  return (request, response) => {
    request.comments = comments;
  }
}
const handlers = [loadResources(guestBookSrc), invalidMethod, guestBookHandler(guestBookSrc, guestBook), apiHandler, serveFileContent, notFound];

module.exports = { handlers };