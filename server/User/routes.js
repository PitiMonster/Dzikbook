const express = require('express');
const userController = require('./controller');
const authController = require('./../controllers/authController');
const postsRouter = require('./../Post/routes');
const acquaintanceRouter = require('./../Acquaintance/routes');

const router = express.Router();

// connect posts` router to user router
router.use('/:userId/posts', postsRouter);

router.use('/:userId/friends', acquaintanceRouter);

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/forgotPassword');
router.patch('/resetPassword/:token');

router.route('/').get(userController.getAllUsers);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe');
router.patch('/updateMyPassword');
router.delete('/deleteMe');

// router.use(authController.restrictTo('admin'))

// router.route('/').post(userController.createUser);

router.route('/:id').get(userController.getUser);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
