const createHTML = (xhr) => {
  const response = JSON.parse(xhr.response);
  const comments = document.getElementById('comments');
  const commentsHTML = response.map(({ username, comment, date }) => {
    const li = document.createElement('li');
    li.innerText = `${date} ${username} : ${comment}`;
    return li;
  });
  comments.innerHTML = '';
  comments.append(...commentsHTML);
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
  return new URLSearchParams(formData).toString();
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', addComment);
};

window.onload = main;
