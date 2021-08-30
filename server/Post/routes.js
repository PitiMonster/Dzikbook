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
  .post(
    authController.restrictTo('user'),
    postController.setAuthorId,
    postController.createPost
  );

router
  .route('/:id')
  .patch(postController.isAuthor, postController.updatePost)
  .delete(postController.isAuthor, postController.deletePost);

module.exports = router;
