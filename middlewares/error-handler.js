// eslint-disable-next-line no-unused-vars

const HttpStatus = require('../helpers/enum/httpStatus.enum');
const { errorResMsg } = require('../helpers/response');

const errorHandler = (err, req, res, next) => {
  
  return errorResMsg(res, err.statusCode||HttpStatus.INTERNAL_SERVER_ERROR, err.message);
};

module.exports.errorHandler = errorHandler;
