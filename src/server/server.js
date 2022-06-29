const http = require('http');

const matches = function (method, path) {
  return this.method === method && this.url.pathname === path;
};

const startServer = (PORT, handler) => {
  const server = http.createServer((request, response) => {
    const url = new URL(`http://${request.headers.host}${request.url}`);
    request.url = url;
    request.matches = matches.bind(request);
    console.log(request.method, request.url.pathname);
    handler(request, response);
  });

  server.listen(PORT, () => console.log('started listening 9999'));
};

module.exports = { startServer };
