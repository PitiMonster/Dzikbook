const express = require('express');
const requestController = require('./controller');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// create request
router
  .route('/')
  .post(
    requestController.canSendRequest,
    requestController.setSender,
    requestController.createRequest
  );

// requestType - acquaintance
// requestStatus - sent/received
router
  .route('/:requestType(acquaintance)/:requestStatus(sent|received)')
  .get(requestController.getRequests);

// send response on request
router.route('/:id').post(requestController.answerTheRequest);

module.exports = router;
