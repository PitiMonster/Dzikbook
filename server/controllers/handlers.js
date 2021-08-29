const catchAsync = require('./../utils/catchAsync');
// const APIFeatures = require('./../utils/APIFeatures')

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

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req, body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('Nod document found with that id', 404));
    }

    res.status(200).json({ status: 'success', data: { data: doc } });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ status: 'success', data: { data: doc } });
  });

exports.getOne = (Model, popObject) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popObject) query = query.populate(popObject);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that id'));
    }

    res.status(200).json({ status: 'success', data: { data: doc } });
  });
