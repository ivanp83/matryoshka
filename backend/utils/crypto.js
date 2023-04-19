const crypto = require('crypto');
const getHash = (payload) => {
  const secret = 'abcdefg2322awd2';
  return crypto
    .createHmac('sha256', secret)
    .update(String(payload))
    .digest('hex');
};
const getHashToken = (payload) => `${payload}:${getHash(payload)}`;

const checkHashToken = (token) => {
  const [payload, hash] = token.split(':');
  return getHash(payload) === hash ? payload : null;
};

module.exports = { getHash, getHashToken, checkHashToken };
