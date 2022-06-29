
const notFound = (request, response) => {
  response.statusCode = 404;
  response.end('Not found');
  return true;
};

const invalidMethod = (request, response) => {
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end('Invalid method');
    return true;
  }
};

module.exports = { notFound, invalidMethod };