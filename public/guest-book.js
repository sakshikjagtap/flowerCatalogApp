const getLastCommentId = () => {
  const lastComment = document.querySelector('#comments :nth-child(1)');
  console.log(lastComment);
  const id = lastComment ? lastComment.id : 0;
  return id;
}

const createHTML = (xhr) => {
  const response = JSON.parse(xhr.response);
  const comments = document.getElementById('comments');
  const lastCommentId = getLastCommentId();
  const newComments = response.filter(({ id }) => id > lastCommentId);
  const commentsHTML = newComments.map(({ id, username, comment, date }) => {
    const li = document.createElement('li');
    li.id = id;
    li.innerText = `${date} ${username} : ${comment}`;
    return li;
  });
  // comments.innerHTML = '';
  comments.prepend(...commentsHTML);
};

const makeXhrRequest = (method, path, cb, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.onload = () => {
    if (xhr.status === 200) {
      cb(xhr);
      return;
    }
    console.log('cannot add comment..!');
  };
  xhr.send(body);
};

const postComment = () => {
  makeXhrRequest('GET', '/api/comment', createHTML);
};

const addComment = () => {
  const formData = collectData();
  makeXhrRequest('POST', '/guest-book', postComment, formData);
};

const collectData = () => {
  const formElement = document.getElementById('form');
  const formData = new FormData(formElement);
  formElement.reset();
  return new URLSearchParams(formData).toString();
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', addComment);
  setInterval(() => makeXhrRequest('GET', '/api/comment', createHTML), 1000);
};

window.onload = main;
