const Post = require('./model');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const crudHandlers = require('./../controllers/handlers');

exports.setAuthorId = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  return next();
};

exports.setQueryAuthor = (req, res, next) => {
  if (!req.query.author) req.query.author = req.params.userId;
  return next();
};

exports.isAuthor = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post.isAuthor(req.user.id)) {
    return next(
      new AppError('You are not authorized to update this post!', 401)
    );
  }
  return next();
});

exports.getAllUsersPosts = crudHandlers.getAll(Post, {
  path: 'author',
  select: 'name surname username profilePhotos',
});

exports.getPost = crudHandlers.getOne(Post, {
  path: 'author',
  select: 'name surname username profilePhotos',
});
exports.createPost = crudHandlers.createOne(Post);
exports.updatePost = crudHandlers.updateOne(Post);
exports.deletePost = crudHandlers.deleteOne(Post);
