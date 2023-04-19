const crypto = require('crypto');
const WEB_APP_DATA_CONST = 'WebAppData';
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;

function parseAuthString(iniData) {
  // parse string to get params
  const searchParams = new URLSearchParams(iniData);

  // take the hash and remove it from params list
  const hash = searchParams.get('hash');
  searchParams.delete('hash');

  // sort params
  const restKeys = Array.from(searchParams.entries());
  restKeys.sort(([aKey, aValue], [bKey, bValue]) => aKey.localeCompare(bKey));

  // and join it with \n
  const dataCheckString = restKeys.map(([n, v]) => `${n}=${v}`).join('\n');

  return {
    dataCheckString,
    hash,
    // get metaData from params
    metaData: {
      user: JSON.parse(searchParams.get('user')),
      auth_date: searchParams.get('auth_date'),
      query_id: searchParams.get('query_id'),
    },
  };
}

// encoding message with key
// we need two types of representation here: Buffer and Hex
function encodeHmac(message, key, repr = undefined) {
  return crypto.createHmac('sha256', key).update(message).digest(repr);
}

function checkAuthorization(iniData) {
  // parsing the iniData sting
  const authTelegramData = parseAuthString(iniData);

  // creating the secret key and keep it as a Buffer (important!)
  const secretKey = encodeHmac(TELEGRAM_BOT_TOKEN, WEB_APP_DATA_CONST);

  // creating the validation key (and transform it to HEX)
  const validationKey = encodeHmac(
    authTelegramData.dataCheckString,
    secretKey,
    'hex',
  );

  // the final step - comparing and returning
  if (validationKey === authTelegramData.hash) {
    return authTelegramData.metaData.user;
  }

  return null;
}

module.exports = { checkAuthorization };
