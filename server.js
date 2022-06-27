const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const onConnection = (socket, handler, serveFrom) => {
  socket.on('error', (err) => { console.log(err); });
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    // console.log(request);
    handler(request, response, serveFrom);
  });
};

const startServer = (PORT, handler, serveFrom) => {
  const server = createServer((socket) =>
    onConnection(socket, handler, serveFrom)
  );

  server.listen(PORT, () => console.log('started listening 9999'));
};

module.exports = { startServer, onConnection };
