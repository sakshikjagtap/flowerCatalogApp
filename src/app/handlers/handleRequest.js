const fs = require("fs");

const generateTag = (tag, content) => {
  return `<${tag}>${content}</${tag}>`
}

const formatComment = ({ name, date, comment }) => {
  return generateTag('li', `${date} ${name} : ${comment}`);
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

const storeComments = (fileName) => {
  return (comments) => {
    const commentsAsString = JSON.stringify(comments);
    fs.writeFileSync(fileName, commentsAsString, "utf-8");
  }
};

const addComment = ({ comments, url, storeComments }, response) => {
  const entry = createEntry(url.searchParams);
  comments.unshift(entry);
  storeComments(comments);
  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');
  return true;
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
  return true;
};

const guestBookHandler = (guestBookSrc, guestBookTemplate) => {
  const template = fs.readFileSync(guestBookTemplate, 'utf-8');
  const saveComments = storeComments(guestBookSrc);

  return (request, response) => {
    const { pathname } = request.url;
    if (request.matches('GET', '/comment')) {
      request.storeComments = saveComments;
      return addComment(request, response);
    }

    if (request.matches('GET', '/guest-book')) {
      request.template = template;
      return showComments(request, response);
    }
    return false;
  };
};

module.exports = { guestBookHandler };