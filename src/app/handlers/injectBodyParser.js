const parseBodyParams = (bodyParams) => {
  const entry = {};
  const params = bodyParams.entries();
  for (const [key, value] of params) {
    entry[key] = value;
  }
  return entry;
};

const injectBodyParams = (req, res, next) => {
  if (req.method !== 'POST') {
    req.bodyParams = {};
    next();
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const bodyParams = new URLSearchParams(body);
    req.bodyParams = parseBodyParams(bodyParams);
    next();
  });
};

module.exports = { injectBodyParams };