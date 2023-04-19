'use-strict';
const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`${message}`);
};

module.exports = { httpError };
