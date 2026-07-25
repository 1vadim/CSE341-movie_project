const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateId, movieValidationRules } = require('../middleware/validateMovies');

router.get('/', moviesController.getAll);
router.get('/:id', validateId, moviesController.getSingle);
router.post('/', movieValidationRules, moviesController.createSingle);
router.put('/:id', validateId, movieValidationRules, moviesController.updateSingle);
router.delete('/:id', validateId, moviesController.deleteSingle);

module.exports = router;
