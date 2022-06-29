const fs = require("fs");
const path = require('path');
const mime = require('mime-types');

const serveFileContent = (request, response) => {
  let { pathname } = request.url;
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const fileName = path.join('public', pathname);
  try {
    response.setHeader('content-type', mime.lookup(fileName));
    const content = fs.readFileSync(fileName);
    response.end(content);
  } catch (error) {
    return false;
  }

  return true;
};

module.exports = { serveFileContent };
