const http = require('http');

const startServer = (PORT, handler) => {
  const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    handler(request, response);
  });

  server.listen(PORT, () => console.log('started listening 9999'));
};

module.exports = { startServer };
