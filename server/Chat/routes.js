const express = require('express');
const chatController = require('./controller');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// create chat
router
  .route('/')
  .get(chatController.getAllUsersChats)
  .post(chatController.createChat);

// get chat
// post message to chat
router
  .route('/:id')
  .get(chatController.getChat)
  .post(chatController.sendMessage);

module.exports = router;
