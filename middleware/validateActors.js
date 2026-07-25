const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const validateId = [
  param('id')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('Invalid actor ID format.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const actorValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),

  body('birthdate')
    .notEmpty()
    .withMessage('Birthdate is required.')
    .isISO8601()
    .toDate()
    .withMessage('Birthdate must be in the format YYYY-MM-DD.'),

  body('birthplace').trim().notEmpty().withMessage('Birthplace is required.'),

  body('nationality').trim().notEmpty().withMessage('Nationality is required.'),

  body('awards').optional().isArray().withMessage('Awards must be an array of strings.'),

  body('popularMovies')
    .isArray({ min: 1 })
    .withMessage('Popular movies must be an array and contain at least one movie.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateId,
  actorValidationRules
};
