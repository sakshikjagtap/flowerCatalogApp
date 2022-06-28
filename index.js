const { serveFileContent } = require('./src/app/serveFileContent.js');
const { addCommentHandler, readPriviousComment } = require('./src/app/handleRequest.js');
const { startServer } = require('./src/server/server.js');
const { router } = require("./src/app.js");
const { notFound } = require('./src/app/notFound.js');


const handlers = [readPriviousComment('comment.json'), serveFileContent, addCommentHandler, notFound];

startServer(9999, router(handlers));