const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/server/router.js');
const { handlers } = require('./src/app.js');

startServer(9999, createRouter(handlers));