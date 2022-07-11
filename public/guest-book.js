const createHTML = (response) => {
  const comments = document.getElementById('comments');
  const commentsHTML = response.map(({ name, comment, date }) => {
    const li = document.createElement('li');
    li.innerText = `${date} ${name} : ${comment}`;
    return li;
  });
  comments.innerHTML = '';
  comments.append(...commentsHTML);
};

const displayComments = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/comment');
  xhr.onload = () => { createHTML(JSON.parse(xhr.response)) };
  xhr.send();
}

const postComment = (xhr) => {
  if (xhr.status === 200) {
    displayComments();
    return;
  }
};

const addComment = () => {
  const formData = collectData();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/guest-book');
  xhr.onload = () => postComment(xhr);
  xhr.send(formData);
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
