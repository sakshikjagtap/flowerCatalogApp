const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound, invalidMethod } = require('./app/handlers/notFound.js');


const staticFile = 'comment.json';
const guestBook = 'src/app/guest-book.html';
const handlers = [invalidMethod, guestBookHandler(staticFile, guestBook), serveFileContent, notFound];

module.exports = { handlers };