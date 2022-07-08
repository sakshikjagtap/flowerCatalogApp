const createCommentHTML = (response) => {
  const comments = document.getElementById('comments');
  const li = document.createElement('li');
  const { name, comment, date } = JSON.parse(response);
  li.innerText = `${date} ${name} : ${comment}`;
  comments.prepend(li);
}

const displayResponse = (xhr) => {
  if (xhr.status === 200) {
    createCommentHTML(xhr.response);
  }
  if (xhr.status === 400) {
    alert('cannot add comment...!')
  }
};

const addComment = () => {
  const formData = collectData();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/guest-book');
  xhr.onload = () => displayResponse(xhr);
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
