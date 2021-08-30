const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/').get(postController.getAllPosts);
router.route('/:id').get(postController.getPost);

// middleware checking whether user is authorized
router.use(authController.protect);

router
  .route('/')
  .post(authController.restrictTo('user'), postController.setAuthorId);

// check if author of post is the one who performs this action
router.use(postController.isAuthor);

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
