const express = require('express');
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const multer = require("multer");

const upload = multer({
    dest: 'public/img/users',
});

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, userController.uploadUserPhoto, userController.updateMe);
router.get('/me', authController.protect, userController.getMe, userController.getUser);

router.route('/')
    .get(authController.protect, authController.restrtictTo('admin'), userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(authController.protect, authController.restrtictTo('admin'), userController.getUserById)
    .patch(authController.protect, authController.restrtictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrtictTo('admin'), userController.deleteUser);

module.exports = router;
