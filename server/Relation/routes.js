const express = require('express');
const relationController = require('./controller');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// post new relation
router
  .route('/')
  .post(relationController.setSender, relationController.createRelation);

// get accepted / sent / received relations
router
  .route('/:relationStatus(accepted|sent|received)')
  .get(relationController.getAllRelations);

// patch - update status of relation found by ID
router.route('/:id').patch(relationController.updateRelationStatus);

module.exports = router;
