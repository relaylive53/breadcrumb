const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'Please Provide userId'],
    },
    locationTagTiming: {
        type: Date,
        required: [true, 'Please provide your dob'],
    },
    latitude: {
        type: Number,
        required: [true, 'Please provide latitude'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please provide longitude'],
    }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;