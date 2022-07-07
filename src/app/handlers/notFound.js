const notFound = (request, response) => {
  response.statusCode = 404;
  response.setHeader('content-type', 'text/plain');
  response.end('Not found');
  return;
};

module.exports = { notFound };