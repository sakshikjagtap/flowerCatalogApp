const fs = require("fs");
const { createApp } = require('./src/app.js');

const write = (fileName, content) => {
  fs.writeFileSync(fileName, content, "utf-8");
};

const read = fileName => fs.readFileSync(fileName, 'utf-8');

const config = {
  guestBookSrc: 'comment.json',
  guestBook: 'src/app/guest-book.html',
}
const details = {
  sessions: {},
  users: { 'abc': { username: 'abc', password: 'a' } },
};

const fileOperations = {
  write: write,
  read: read
};

const app = createApp(config, fileOperations, details);
const port = 9999;

app.listen(port, () => () => {
  console.log(`listening on port ${port}`)
});
