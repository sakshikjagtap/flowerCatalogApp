const matches = function (method, path) {
  return this.method === method && this.url.pathname === path;
};


const createNext = handlers => {
  let index = -1;
  const callNextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNextHandler(req, res));
    }
  };
  return callNextHandler;
};

const createRouter = (handlers) => {
  return (req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    req.url = url;
    req.matches = matches.bind(req);
    const next = createNext(handlers);
    next(req, res);
  };
};

module.exports = { createRouter };
