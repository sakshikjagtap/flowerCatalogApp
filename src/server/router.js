const router = (handlers) => {
  return (request, response) => {
    for (let index = 0; index < handlers.length; index++) {
      const handler = handlers[index];
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

exports.router = router;
