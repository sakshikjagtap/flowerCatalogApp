const errorMessages = {
  200: 'OK',
  404: 'not found'
};

const EOL = '\r\n';

const getErrorMessage = (code) => {
  return errorMessages[code];
}

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  setHeader(field, value) {
    this.#headers[field] = value;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([field, value]) => {
      this.#socket.write(`${field}:${value}${EOL}`);
    });
  }

  send(content) {
    const code = this.#statusCode;
    const message = getErrorMessage(code);
    this.setHeader('content-length', content.length);
    this.#socket.write(`HTTP/1.1 ${this.#statusCode} ${message}${EOL}`);
    this.#writeHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
