const Relation = require('./model');
const crudHandlers = require('./../controllers/handlers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setSender = (req, res, next) => {
  if (!req.body.sender) req.body.sender = req.user.id;
  next();
};

exports.isPermittedToUpdateRelation = catchAsync(async (req, res, next) => {
  const relation = await Relation.findById(req.params.id);
  console.log(relation);
  if (!relation) {
    return next(new AppError('Relation with that ID does not exists', 404));
  }

  if (!relation.isPermittedToUpdate(req.user.id)) {
    return next(new AppError('You are not permitted to update'));
  }

  next();
});

exports.getAllRelations = crudHandlers.getAll(
  Relation,
  { path: 'sender', select: 'name surname username profilePhotos' },
  { path: 'receiver', select: 'name surname username profilePhotos' }
);

exports.createRelation = crudHandlers.createOne(Relation);

exports.updateRelationStatus = crudHandlers.updateOne(Relation);
// TODO teraz nawalamy wyświetlanie friendsów i naprawienie populowania userów
