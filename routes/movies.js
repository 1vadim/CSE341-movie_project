const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateId, movieValidationRules } = require('../middleware/validateMovies');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', moviesController.getAll);
router.get('/:id', validateId, moviesController.getSingle);
router.post('/', isAuthenticated, movieValidationRules, moviesController.createSingle);
router.put(
  '/:id',
  isAuthenticated,
  validateId,
  movieValidationRules,
  moviesController.updateSingle
);
router.delete('/:id', isAuthenticated, validateId, moviesController.deleteSingle);

module.exports = router;
