const fs = require("fs");

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf'
};

const determineContentType = (fileName) => {
  const extension = fileName.split('.').slice(-1);
  return contentType[extension] || 'text/plain';
};

const serveFileContent = (request, response) => {
  const { path } = request;
  if (path === '/') {
    path = '/index.html';
  }

  const fileName = './public' + path;
  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeader('content-type', determineContentType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
