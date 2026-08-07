const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const { validateId, actorValidationRules } = require('../middleware/validateActors');
const { isAuthenticated } = require('../middleware/authenticate');
const { handleAsync } = require('../middleware/errorHandler');


router.get('/', handleAsync(actorsController.getAll));

router.get('/:id', validateId, handleAsync(actorsController.getSingle));

router.post('/', isAuthenticated, actorValidationRules, handleAsync(actorsController.createSingle));

router.put(
  '/:id',
  isAuthenticated,
  validateId,
  actorValidationRules,
  handleAsync(actorsController.updateSingle)
);

router.delete('/:id', isAuthenticated, validateId, handleAsync(actorsController.deleteSingle));

module.exports = router;
