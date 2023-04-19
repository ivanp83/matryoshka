const { prepareFile } = require('../services/file.service');
const { httpError } = require('../utils/error');
const { MIME_TYPES } = require('../utils/types');

const retrieveFile = async (filePath, res) => {
  const file = await prepareFile(filePath);

  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { 'Content-Type': mimeType });
  return file.stream.pipe(res);
};

module.exports = { retrieveFile };
