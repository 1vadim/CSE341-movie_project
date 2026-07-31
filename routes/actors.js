const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const { validateId, actorValidationRules } = require('../middleware/validateActors');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', actorsController.getAll);

router.get('/:id', validateId, actorsController.getSingle);

router.post('/', isAuthenticated, actorValidationRules, actorsController.createSingle);

router.put(
  '/:id',
  isAuthenticated,
  validateId,
  actorValidationRules,
  actorsController.updateSingle
);

router.delete('/:id', isAuthenticated, validateId, actorsController.deleteSingle);

module.exports = router;
