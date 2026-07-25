const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const { validateId, actorValidationRules } = require('../middleware/validateActors');

router.get('/', actorsController.getAll);

router.get('/:id', validateId, actorsController.getSingle);

router.post('/', actorValidationRules, actorsController.createSingle);

router.put('/:id', validateId, actorValidationRules, actorsController.updateSingle);

router.delete('/:id', validateId, actorsController.deleteSingle);

module.exports = router;
