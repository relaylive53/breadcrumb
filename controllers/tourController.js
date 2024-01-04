const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`));

exports.checkTourId = (req, res, next, value) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    next();
}

exports.validateTour = (req, res, next) => {
    if (req.body?.name && req.body?.price) {
        next();
    }
    else {
        return res.status(400).json({
            status: 'fail',
            data: 'name and price required',
        });
    }
}

exports.getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tours: tours,
        },
    });
};
exports.getTourById = (req,res) => {
    console.log(req.params);
    const searchTour = tours.find(tour => tour.id == req.params.id);
    console.log(searchTour);
    res.status(200).json({
        status: 'success',
        data: {
            tour: searchTour,
        },
    });
};
exports.createTour = (req,res) => {
    const newId = tours[tours.length -1].id + 1;
    const newTour = {
        id: newId,
        ...req.body
    };
    tours.push(newTour);
    fs.writeFile((`${__dirname}/../starter/dev-data/data/tours-simple.json`), JSON.stringify(tours), err => {
        console.log(err);
        return res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        })
    });
};
exports.updateTour = (req,res) => {
    const searchTour = tours.find(tour => tour.id == req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: searchTour,
        },
    });
};
exports.deleteTour = (req,res) => {
    const searchTour = tours.find(tour => tour.id == req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
};
