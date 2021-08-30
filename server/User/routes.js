const express = require('express');
const { route } = require('../app');
const userController = require('./controller');
const authController = require('./../controllers/authController');
const postsRouter = require('./../Post/routes');

const router = express.Router();

// connect posts` router to user router
router.use('/:userId/posts', postsRouter);

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/forgotPassword');
router.patch('/resetPassword/:token');

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe');
router.patch('/updateMyPassword');
router.delete('/deleteMe');

// router.use(authController.restrictTo('admin'))

router.route('/').get(userController.getAllUsers);
//   .post(userController.createUser);

// router('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
