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
  let message = 'Invalid credential';
  if (xhr.status === 200) {
    window.location.href = '/guest-book';
    return
  }
  createMessageHtml(message);
};

const collectData = () => {
  const formElement = document.getElementById('loginForm');
  const formData = new FormData(formElement);
  formElement.reset();
  return new URLSearchParams(formData);
};

const loginUser = () => {
  const formData = collectData();
  makeXhrRequest('POST', '/login', addUser, formData);
};

const main = () => {
  const button = document.querySelector('#login');
  button.onclick = loginUser;
};

window.onload = main;