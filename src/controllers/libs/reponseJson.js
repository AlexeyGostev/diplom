const http = require('http');

class ResponseConstructor {
  constructor(status, description, errorCode) {
    this.status = typeof status === 'number' ? status : 200;
    this.description = typeof status === 'string' ? status : description;
    this.errorCode = typeof errorCode === 'number' ? errorCode : 0;
    this.message = http.STATUS_CODES[this.status];
    this.body = {};
  }

  setAll(status, description, errorCode) {
    this.status = typeof status === 'number' ? status : 200;
    this.description = typeof status === 'string' ? status : description;
    this.errorCode = typeof errorCode === 'number' ? errorCode : 0;
    this.message = http.STATUS_CODES[this.status];
  }

  setStatus(status) {
    if (typeof status === 'number') {
      this.status = status;
      return true;
    }
    return false;
  }

  setDescription(description) {
    if (typeof description === 'string') {
      this.description = description;
      return true;
    }
    return false;
  }

  setErrorCode(errorCode) {
    if (typeof errorCode === 'number') {
      this.errorCode = errorCode;
      return true;
    }
    return false;
  }

  set(property, value) {
    if (typeof property === 'string') {
      this.body[property] = value;
      return true;
    }
    return false;
  }
}

module.exports = ResponseConstructor;