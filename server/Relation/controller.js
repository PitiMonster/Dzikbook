const Relation = require('./model');
const crudHandlers = require('./../controllers/handlers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setSender = (req, res, next) => {
  if (!req.body.sender) req.body.sender = req.user.id;
  next();
};

exports.getAllRelations = crudHandlers.getAll(
  Relation,
  { path: 'sender', select: 'name surname username profilePhotos' },
  { path: 'receiver', select: 'name surname username profilePhotos' }
);

exports.createRelation = crudHandlers.createOne(Relation);

// TODO protect from updating other field than 'status'
// TODO restrict to sender and receiver
exports.updateRelationStatus = crudHandlers.updateOne(Relation);

// TODO teraz nawalamy wyświetlanie friendsów i naprawienie populowania userów
