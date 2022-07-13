const fs = require("fs");
const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const write = (fileName, content) => {
  fs.writeFileSync(fileName, content, "utf-8");
};

const read = fileName => fs.readFileSync(fileName, 'utf-8');

const config = {
  guestBookSrc: 'comment.json',
  guestBook: 'src/app/guest-book.html',
  sessions: {},
  users: { 'abc': { username: 'abc', password: 'a' } },
  write: write,
  read: read
};

startServer(9999, app(config));