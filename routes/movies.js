const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateId, movieValidationRules } = require('../middleware/validateMovies');
const { handleAsync } = require('../middleware/errorHandler');

router.get('/', handleAsync(moviesController.getAll));

router.get('/:id', validateId, handleAsync(moviesController.getSingle));

router.post('/', movieValidationRules, handleAsync(moviesController.createSingle));

router.put(
  '/:id',
  validateId,
  movieValidationRules,
  handleAsync(moviesController.updateSingle)
);

router.delete('/:id', validateId, handleAsync(moviesController.deleteSingle));

module.exports = router;
