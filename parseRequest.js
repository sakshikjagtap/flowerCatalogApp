const parseUri = (rowPath) => {
  const queryParams = {};
  const [path, queryString] = rowPath.split('?');
  if (!queryString) {
    return { path, queryParams };
  }
  const params = queryString.split('&');
  params.forEach((queryParam) => {
    const [param, value] = queryParam.split('=');
    queryParams[param] = value;
  });
  return { path, queryParams };
};

const splitRequestLine = (line) => {
  const [method, rowPath, httpVersion] = line.split(' ');
  const path = parseUri(rowPath);
  return { method, ...path, httpVersion };
};

const splitHeader = (line) => {
  const indexOfColon = line.indexOf(':');
  const key = line.slice(0, indexOfColon);
  const value = line.slice(indexOfColon + 1).trim();
  return [key, value];
};
const requestHeader = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = splitHeader(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};
const parseRequest = (request) => {
  const lines = request.split('\r\n');
  const requestLine = splitRequestLine(lines[0]);
  const headers = requestHeader(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest, splitRequestLine, requestHeader, splitHeader };
