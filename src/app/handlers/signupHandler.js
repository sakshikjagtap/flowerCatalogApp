const addUser = (req, res, users) => {
  const { username, password } = req.bodyParams;

  if (users[username]) {
    res.status(409);
    res.end('already exist');
    return;
  }

  res.status(200);
  users[username] = { username, password };
  res.end('signup successful');
  return;
};

const showSignupPage = (users) => {
  return (req, res, next) => {
    res.redirect('/signup.html')
    return;
  }
};

const signupHandler = (users) => {
  return (req, res, next) => {
    addUser(req, res, users);
    return;
  };
};

module.exports = { signupHandler, showSignupPage };