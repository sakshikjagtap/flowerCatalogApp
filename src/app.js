const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound } = require('./app/handlers/notFound.js');
const { apiHandler } = require('./app/handlers/apiHandler.js');
const { loadResources } = require("./app/handlers/loadResources");

const guestBookSrc = 'comment.json';
const guestBook = 'src/app/guest-book.html';

const handlers = [loadResources(guestBookSrc), guestBookHandler(guestBookSrc, guestBook), apiHandler, serveFileContent, notFound];

module.exports = { handlers };