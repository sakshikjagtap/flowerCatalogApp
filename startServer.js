const { serveFileContent } = require('./serveFileContent.js');
const { startServer } = require('./server.js');
const { fileNotFound, addCommentHandler, readPriviousComment } =
  require('./handleRequest.js');


const createHandler = (handlers) => {
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

const handlers = [readPriviousComment('comment.json'), serveFileContent, addCommentHandler, fileNotFound,];
startServer(9999, createHandler(handlers));