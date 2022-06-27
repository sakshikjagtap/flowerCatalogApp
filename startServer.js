const { serveFileContent } = require('./serveFileContent.js');
const { startServer } = require('./server.js');
const { fileNotFound, addCommentHandler } = require('./handleRequest.js');


const createHandler = (handlers, serveFrom) => {
  return (request, response) => {
    for (let index = 0; index < handlers.length; index++) {
      const handler = handlers[index];
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

const handlers = [serveFileContent, addCommentHandler, fileNotFound,];
startServer(9999, createHandler(handlers));