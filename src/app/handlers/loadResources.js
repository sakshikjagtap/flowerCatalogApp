const loadResources = (guestBookSrc, read) => {
  const comments = JSON.parse(read(guestBookSrc));
  return (request, response, next) => {
    request.comments = comments;
    next();
  };
};

exports.loadResources = loadResources;
