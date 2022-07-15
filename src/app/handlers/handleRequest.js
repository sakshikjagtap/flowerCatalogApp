const express = require('express');
const generateTag = (tag, content, id) => {
  return `<${tag} id=${id}>${content}</${tag}>`
}

const formatComment = ({ username, date, comment, id }) => {
  return generateTag('li', `${date} ${username} : ${comment}`, id);
};

const getCommentId = (comments) => {
  const lastComment = comments[0];
  const id = lastComment ? lastComment.id : 0;
  return id + 1;
}

const addComment = (request, response, guestBookSrc, write) => {
  const { comments, bodyParams } = request;
  const { comment } = bodyParams;
  const { username } = request.session;
  const id = getCommentId(comments);
  if (username && comment) {
    bodyParams.id = id;
    bodyParams.username = username;
    bodyParams.date = new Date().toLocaleString();
    comments.unshift(bodyParams);
    write(guestBookSrc, JSON.stringify(comments));
    response.status(200);
    response.end('comment added');
    return;
  }
  response.status(400);
  response.end();
};

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
};


const validateUser = () => {
  return (req, res, next) => {
    if (!req.session) {
      res.redirect('/login.html');
      return;
    };
    next();
  };
}

const loadComments = (comments) => {
  return (req, res, next) => {
    req.comments = comments;
    next();
  };
};

const showComments = ({ comments, template }, response) => {
  const commentString = getAllComments(comments);
  content = template.replace('__Comments__', commentString);
  response.type('html');
  response.end(content);
  return;
};

const postComment = (guestBookSrc, write) => {
  return (request, response, next) => {
    addComment(request, response, guestBookSrc, write);
    return;
  };
};

const showGuestBook = (guestBookTemplate, read) => {
  const template = read(guestBookTemplate);

  return (request, response, next) => {
    request.template = template;
    return showComments(request, response);
  }
};

module.exports = { showGuestBook, postComment, loadComments, validateUser };