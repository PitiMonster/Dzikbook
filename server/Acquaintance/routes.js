const express = require('express');
const acquaintanceController = require('./controllers');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(acquaintanceController.getAllFriends);

router.use(authController.protect);

router.route('/:friendId').get(acquaintanceController.checkIfFriend);

module.exports = router;
