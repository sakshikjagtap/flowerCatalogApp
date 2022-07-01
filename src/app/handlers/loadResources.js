const fs = require('fs');

const loadResources = (guestBookSrc) => {
  const comments = JSON.parse(fs.readFileSync(guestBookSrc, 'utf-8'));
  return (request, response, next) => {
    request.comments = comments;
    next();
  };
};

exports.loadResources = loadResources;
