const express = require('express');
const chatControllers = require('./controllers');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// create chat
router.route('/').post();

// get chat
// post message to chat
router.route('/:id').get().post();
