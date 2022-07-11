const fs = require("fs");

const generateTag = (tag, content) => {
  return `<${tag}>${content}</${tag}>`
}

const formatComment = ({ name, date, comment }) => {
  return generateTag('li', `${date} ${name} : ${comment}`);
};

const storeComments = (fileName) => {
  return (comments) => {
    const commentsAsString = JSON.stringify(comments);
    fs.writeFileSync(fileName, commentsAsString, "utf-8");
  }
};

const addComment = ({ comments, bodyParams, storeComments }, response) => {
  const { name, comment } = bodyParams
  if (name && comment) {
    bodyParams.date = new Date().toLocaleString();
    comments.unshift(bodyParams);
    storeComments(comments);
    response.statusCode = 200;
    response.end();
    return;
  }
  response.statusCode = 400;
  response.end();
};

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
};

const showComments = ({ comments, template }, response) => {
  const commentString = getAllComments(comments);
  content = template.replace('__Comments__', commentString);
  response.setHeader('content-type', 'text/html');
  response.end(content);
  return;
};

const guestBookHandler = (guestBookSrc, guestBookTemplate) => {
  const template = fs.readFileSync(guestBookTemplate, 'utf-8');
  const comments = storeComments(guestBookSrc);

  return (request, response, next) => {
    if (request.matches('POST', '/guest-book')) {
      request.storeComments = comments;
      addComment(request, response);
      return;
    }

    if (request.matches('GET', '/guest-book')) {
      request.template = template;
      return showComments(request, response);
    }
    next();
  };
};

module.exports = { guestBookHandler };