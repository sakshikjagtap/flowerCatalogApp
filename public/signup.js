const makeXhrRequest = (method, path, cb, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.onload = () => {
    cb(xhr);
  };
  xhr.send(body);
};

const createMessageHtml = (acknowledge) => {
  const message = document.getElementById('message');
  message.innerText = acknowledge;
};

const addUser = (xhr) => {
  let message = 'Signup successful';
  if (xhr.status === 409) {
    message = 'user already exist';
  }
  createMessageHtml(message);
};

const collectData = () => {
  const formElement = document.getElementById('signupForm');
  const formData = new FormData(formElement);
  formElement.reset();
  return new URLSearchParams(formData);
};

const signupUser = () => {
  const formData = collectData();
  makeXhrRequest('POST', '/signup', addUser, formData);
};

const main = () => {
  const button = document.querySelector('#signup');
  button.onclick = signupUser;
};

window.onload = main;