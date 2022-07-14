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

const addComment = (request, response, guestBookSrc) => {
  const { comments, bodyParams, storeComments } = request;
  const { comment } = bodyParams;
  const { username } = request.session;
  const id = getCommentId(comments);
  if (username && comment) {
    bodyParams.id = id;
    bodyParams.username = username;
    bodyParams.date = new Date().toLocaleString();
    comments.unshift(bodyParams);
    storeComments(guestBookSrc, JSON.stringify(comments));
    response.statusCode = 200;
    response.end('comment added');
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

const guestBookHandler = (guestBookSrc, guestBookTemplate, write, read) => {
  const template = read(guestBookTemplate);

  return (request, response, next) => {
    if (request.method === 'POST' && request.url === '/guest-book') {
      request.storeComments = write;
      addComment(request, response, guestBookSrc);
      return;
    }

    if (request.method === 'GET' && request.url === '/guest-book') {
      request.template = template;
      return showComments(request, response);
    }
    next();
  };
};

module.exports = { guestBookHandler };