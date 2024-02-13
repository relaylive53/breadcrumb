
const Location = require('./../models/locationModel');
const catchAsync = require('./../utils/catchAsync')

exports.getAllLocations = catchAsync (async (req, res, next) => {
    const locations = await Location.find();
    res.status(200).json({
        status: 'success',
        results: locations.length,
        data: {
            locations,
        }
    })
});

exports.addLocation =  catchAsync(async (req, res, next) => {
    const locationObject = req.body;
    const userLocation = await Location.create({
        // userId: req.user[0].userId,
        locationTagTiming: locationObject.locationTagTiming,
        latitude: locationObject.latitude,
        longitude: locationObject.longitude,
    });
    res.status(201).json({
        status: 'success',
        data: {
            location: userLocation,
        }
    })
});

exports.getLocationById = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

exports.updateLocation = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

exports.deleteLocation = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

exports.getLocationByUserId = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}
