const fs = require("fs");

const formatComment = ({ name, date, comment }) => {
  return `<li>${date} ${name} ${comment}</li>`;
};

const getAllComments = (comments) => {
  let commentsAsString = '';
  comments.forEach(comment => {
    commentsAsString += formatComment(comment);
  })
  return commentsAsString;
};

const createEntry = (searchParams) => {
  const entry = {};
  const params = searchParams.entries();
  for (const [key, value] of params) {
    entry[key] = value;
  }
  entry.date = new Date().toLocaleString();
  return entry;
}

const addComment = (request, response) => {
  const entry = createEntry(request.url.searchParams);
  request.comments.unshift(entry);
  fs.writeFileSync('comment.json', JSON.stringify(request.comments), "utf-8");
  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');
  return true;
};

const showComments = (request, response) => {
  const commentString = getAllComments(request.comments);
  let template = fs.readFileSync('public/guest-book.html', 'utf-8');
  template = template.replace('__Comments__', commentString);
  response.setHeader('content-type', 'text/html');
  response.end(template);
  return true;
};

const guestBookHandler = (fileName) => {
  const comments = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  return (request, response) => {
    const { pathname } = request.url;
    if (pathname === '/comment') {
      request.comments = comments;
      return addComment(request, response);
    }

    if (pathname === '/guest-book') {
      request.comments = comments;
      return showComments(request, response);
    }
    return false;
  };
};


module.exports = { guestBookHandler };