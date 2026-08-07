const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateId, movieValidationRules } = require('../middleware/validateMovies');
const { isAuthenticated } = require('../middleware/authenticate');
const { handleAsync } = require('../middleware/errorHandler');

router.get('/', handleAsync(moviesController.getAll));
router.get('/:id', validateId, handleAsync(moviesController.getSingle));
router.post('/', isAuthenticated, movieValidationRules, handleAsync(moviesController.createSingle));
router.put(
  '/:id',
  isAuthenticated,
  validateId,
  movieValidationRules,
  handleAsync(moviesController.updateSingle)
);
router.delete('/:id', isAuthenticated, validateId, handleAsync(moviesController.deleteSingle));

module.exports = router;
