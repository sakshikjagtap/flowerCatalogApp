const fs = require("fs");
const path = require('path');
const mime = require('mime-types');

const serveFileContent = (request, response, next) => {
  let { pathname } = request.url;
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const fileName = path.join('public', pathname);
  if (!fs.existsSync(fileName)) {
    next();
    return;
  }

  response.setHeader('content-type', mime.lookup(fileName));
  const readStream = fs.createReadStream(fileName);
  readStream.on('data', (chunk) => {
    response.write(chunk);
  });

  readStream.on('end', () => {
    response.end('')
  });

  return;
};

module.exports = { serveFileContent };
