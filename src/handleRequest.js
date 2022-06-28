const fs = require("fs");

const fileNotFound = (request, response) => {
  response.statusCode = 404;
  response.send('unknown');
  return true;
};

const addCommentToRequest = (comments) => {
  return (request, response) => {
    request.comments = comments;
    return false;
  }
};

const readPriviousComment = (fileName) => {
  const comments = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  return addCommentToRequest(comments);
};

const formatComment = ({ name, date, comment }) => {
  comment = comment.replaceAll('+', ' ');
  console.log(name, date, comment);
  return `<li>${date} ${name} ${comment}<li>`;
};

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
};

const redirectTo = (response, location) => {
  response.statusCode = 302;
  response.setHeader('location', location);
  response.send('');
};

const addComment = (request, response) => {
  const { name, comment } = request.queryParams;
  const date = new Date();
  const newComment = {
    name: name,
    comment: comment,
    date: date.toString()
  }
  request.comments.unshift(newComment);
  fs.writeFileSync('comment.json', JSON.stringify(request.comments), "utf-8");
  redirectTo(response, '/guest-book');
  return true;
};

const showComments = (request, response) => {
  const commentString = getAllComments(request.comments);
  let template = fs.readFileSync('public/guest-book.html', 'utf-8');
  template = template.replace('__Comments__', commentString);
  response.setHeader('content-type', 'text/html');
  response.send(template);
  return true;
};

const addCommentHandler = (request, response) => {
  const { path } = request;
  if (path === '/comment') {
    addComment(request, response);
  }

  if (path === '/guest-book') {
    return showComments(request, response);
  }
  return false;
};


module.exports = { fileNotFound, addCommentHandler, readPriviousComment };