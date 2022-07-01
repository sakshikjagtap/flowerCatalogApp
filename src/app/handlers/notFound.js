const notFound = (request, response) => {
  response.statusCode = 404;
  response.end('Not found');
  return;
};

module.exports = { notFound };