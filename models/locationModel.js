const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    locationTagTiming: {
        type: Date,
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