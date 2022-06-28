const { serveFileContent } = require('./src/app/serveFileContent.js');
const { guestBookHandler } = require('./src/app/handleRequest.js');
const { startServer } = require('./src/server/server.js');
const { router } = require("./src/app.js");
const { notFound } = require('./src/app/notFound.js');


const handlers = [guestBookHandler('comment.json'), serveFileContent, notFound];

startServer(9999, router(handlers));