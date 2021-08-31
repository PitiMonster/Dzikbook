const express = require('express');
const acquaintanceController = require('./controllers');

const router = express.Router({ mergeParams: true });

router.route('/').get(acquaintanceController.getAllFriends);

module.exports = router;
