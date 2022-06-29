const { startServer } = require('./src/server/server.js');
const { router } = require('./src/server/router.js');
const { handlers } = require('./src/app.js');

startServer(9999, router(handlers));