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
  return `<div>${date} ${name} ${comment}</div>`;
};

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
};

const addComment = (request) => {
  const { name, comment } = request.queryParams;
  const date = new Date();
  const newComment = {
    name: name,
    comment: comment,
    date: date.toString()
  }
  request.comments.unshift(newComment);
  // fs.writeFileSync('comment.json', JSON.stringify(request.comments), "utf-8");
};

const showComments = (request, response) => {
  const commentString = getAllComments(request.comments);
  let template = fs.readFileSync('public/template.html', 'utf-8');
  template = template.replace('__Comments__', commentString);
  fs.writeFileSync('public/guest-book.html', template, 'utf8');
};

const redirectTo = (location) => {
  response.statusCode = 302;
  response.setHeader('location', location);
  response.send('hello');
};

const addCommentHandler = (request, response) => {
  const { name, comment } = request.queryParams;
  if (!(name && comment)) {
    return false;
  }

  addComment(request);
  showComments(request, response);
  redirectTo('./guest-book.html');
  return true;
};


module.exports = { fileNotFound, addCommentHandler, readPriviousComment };