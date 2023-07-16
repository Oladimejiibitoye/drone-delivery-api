const { validationResult, param, body } = require('express-validator');
const { errorResMsg } = require('../helpers/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const resultErrors = [];
  errors.array().forEach((err) => resultErrors.push({ [err.param]: err.msg }));
  const errorObject = Object.assign({}, ...resultErrors);
  return errorResMsg(res, 422, errorObject);
};
// Validate UUIDs
const uuidValidationRules = (id) => [param(id).isUUID(4).notEmpty().withMessage('Please provide a valid UUID4')];


const medicationValidationRules = [
  body('medications.*.name')
    .notEmpty().withMessage('Name is required.')
    .matches(/^[a-zA-Z0-9-_]+$/).withMessage("Name can only contain letters, numbers, '-', and '_'"),
  body('medications.*.weight')
    .notEmpty().withMessage('Weight is required')
    .isDecimal().withMessage('Weight is required and is an integer or decimal'),
  body('medications.*.code')
    .notEmpty().withMessage('Code is required.')
    .matches(/^[A-Z0-9_]+$/).withMessage("Code can only contain uppercase letters, numbers, and '_'."),
  body('medications.*.image')
    .notEmpty().withMessage('Image is required')
]



module.exports = {
  validate,
  uuidValidationRules,
  medicationValidationRules
};
