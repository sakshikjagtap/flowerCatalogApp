const getApi = (request, response) => {
  const { url: pathname } = request;

  if (pathname === '/api') {
    const flowerCatalog = {
      flowers: 'http://localhost:9999/api/flowers',
      comment: 'http://localhost:9999/api/comment'
    }
    response.end(JSON.stringify(flowerCatalog));
    return true;
  }

  if (pathname === '/api/comment') {
    response.statusCode = 200;
    response.end(JSON.stringify(request.comments));
    return;
  }

  if (pathname === '/api/flowers') {
    const flowers = [
      {
        name: 'abeliophyllum', url: 'http://localhost:9999/Abeliophyllum.html'
      },
      {
        name: 'agerantum', url: 'http://localhost:9999/agerantum.html'
      }
    ];

    response.end(JSON.stringify(flowers));
    return;
  }
};


const apiHandler = (request, response, next) => {
  const { url: pathname } = request;
  if (request.method === 'GET' && pathname.startsWith('/api')) {
    return getApi(request, response);
  }
  next();
};

module.exports = { apiHandler };