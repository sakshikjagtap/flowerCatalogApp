const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

startServer(9999, app);