const express = require('express');
const { route } = require('../app');
const userController = require('./controller');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login');
router.post('/forgotPassword');
router.patch('/resetPassword/:token');

// router.use(authController.protect)

router.get('/me');
router.patch('/updateMe');
router.patch('/updateMyPassword');
router.delete('/deleteMe');

// router.use(authController.restrictTo('admin'))

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
