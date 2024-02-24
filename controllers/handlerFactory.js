const catchAsync = require ('./../utils/catchAsync');
const AppError = require ('./../utils/appError');

exports.deleteOne = Model => catchAsync ( async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError ('No document find with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
})

exports.getOne = Model => catchAsync ( async (req, res, next) => {
    console.log('Model', Model);
    console.log('req.params.id', req.params.id);
    const doc = await Model.findById(req.params.id);
    if (doc.length === 0) {
        return next(new AppError ('No document find with that ID', 404))
    }
    console.log(doc);
    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});

exports.updateOne = Model => catchAsync (async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!doc) {
        return next(new AppError ('No document find with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        }
    })
});