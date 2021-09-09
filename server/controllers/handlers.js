const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const QueryFeatures = require('./../utils/queryFeatures');

// delete object of given Model assigned to req.params.id
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: 'Remove successfully',
      },
    });
  });

// update object of given Model assigned to req.params.id with req.body data
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({ status: 'success', data: { data: doc } });
  });

// create object of given Model with req.body data
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ status: 'success', data: { data: doc } });
  });

// get object of given Model assigned to req.params.id
// popObject - contains paths for fields to populate
exports.getOne = (Model, popObject) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popObject) query = query.populate(popObject);
    const doc = await query.select('-__v');
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({ status: 'success', data: { data: doc } });
  });

// get all objects of given Model
exports.getAll = (Model, ...popObjects) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // create filter object based on provided url params
    if (req.params.userId) filter['author'] = req.params.userId;
    if (req.params.requestStatus) {
      if (req.params.requestStatus === 'sent') filter['sender'] = req.user.id;
      else filter['receiver'] = req.user.id;
    }
    const features = new QueryFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();
    let docs;
    if (popObjects.length > 0) {
      for (const popObject of popObjects) {
        features.query.populate(popObject);
      }
      docs = await features.query;
    } else docs = await features.query;

    res.status(200).json({ status: 'success', data: { data: docs } });
  });
