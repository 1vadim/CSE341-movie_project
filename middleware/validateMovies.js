const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const validateId = [
  param('id')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('Invalid movie ID format.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const movieValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('director').trim().notEmpty().withMessage('Director is required.'),
  body('year').isInt({ min: 1888, max: new Date().getFullYear() + 10 }).withMessage('Invalid year.'),
  body('duration').isInt({ min: 0 }).withMessage('Invalid duration.'),
  body('rating').isFloat({ min: 0, max: 10 }).withMessage('Invalid rating.'),
  body('language').trim().notEmpty().withMessage('Language is required.'),
  body('genre').trim().notEmpty().withMessage('Genre is required.'),
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
  movieValidationRules
};
