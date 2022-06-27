const fs = require("fs");

const fileNotFound = (request, response) => {
  response.statusCode = 404;
  response.send('unknown');
  return true;
};

const comments = [];

const formatComment = ({ name, date, comment }) => {
  console.log(name, date, comment);
  return `<div>${date} ${name} ${comment}</div>`;
}

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
}

const writeComments = (commentString) => {
  let template = fs.readFileSync('public/template.html', 'utf-8');
  template = template.replace('__Comments__', commentString);
  template = template.replace('+', ' ');
  fs.writeFileSync('public/guest-book.html', template, 'utf8');
}

const addComment = (request, response) => {
  const { name, comment } = request.queryParams;
  const date = new Date();
  const newComment = {
    name: name,
    comment: comment,
    date: date.toString()
  }
  comments.unshift(newComment);
  fs.writeFileSync('comment.json', JSON.stringify(comments), "utf-8");
}


const addCommentHandler = (request, response) => {
  addComment(request, response);
  const commentString = getAllComments(comments);
  writeComments(commentString);
  response.statusCode = 302;
  response.setHeader('location', 'guest-book.html');
  response.send('hello');
  return true;
}

module.exports = { fileNotFound, addCommentHandler };