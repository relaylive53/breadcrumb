const express = require('express');
const locationController = require('./../controllers/locationController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, locationController.getAllLocations).post( locationController.addLocation);
router.route('/:id').get(locationController.getLocationById).patch(locationController.updateLocation).delete(locationController.deleteLocation);
router.route('/:userId').patch(locationController.getLocationByUserId);

module.exports = router;
