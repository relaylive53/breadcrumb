const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
router.param('id', tourController.checkTourId);
router.route('/').get(tourController.getAllTours).post(tourController.validateTour, tourController.createTour);
router.route('/:id').get(tourController.getTourById).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;