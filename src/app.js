const { guestBookHandler } = require('./app/handlers/handleRequest.js');
const { serveFileContent } = require('./app/handlers/serveFileContent.js');
const { notFound } = require('./app/handlers/notFound.js');

const handlers = [guestBookHandler('comment.json'), serveFileContent, notFound];

module.exports = { handlers };