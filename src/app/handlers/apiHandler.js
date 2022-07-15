const showApi = (req, res, next) => {
  const flowerCatalog = {
    flowers: 'http://localhost:9999/api/flowers',
    comment: 'http://localhost:9999/api/comment'
  }
  res.json(flowerCatalog);
  return;
};

const showFlowersApi = (req, res, next) => {
  const flowers = [
    {
      name: 'abeliophyllum', url: 'http://localhost:9999/Abeliophyllum.html'
    },
    {
      name: 'agerantum', url: 'http://localhost:9999/agerantum.html'
    }
  ];

  res.json(flowers);
  return;
};

const showCommentsApi = (req, res, next) => {
  res.statusCode = 200;
  res.json(req.comments);
  return;
};

module.exports = { showApi, showFlowersApi, showCommentsApi };